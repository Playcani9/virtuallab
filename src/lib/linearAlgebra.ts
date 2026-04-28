/**
 * Linear Algebra Utility functions for Step-by-Step RREF and Vector analysis
 */

import { cacheService } from './cache';

export interface RrefStep {
  title: string;
  matrix: number[][];
  description: string;
}

/**
 * Solve RREF with built-in caching for performance
 */
export function solveRREF(matrix: number[][]): { result: number[][], steps: RrefStep[], rank: number } {
  const cacheKey = cacheService.generateKey('rref', matrix);
  const cached = cacheService.get<{ result: number[][], steps: RrefStep[], rank: number }>(cacheKey);
  
  if (cached) {
    console.log('[Cache] Hit for RREF computation');
    return cached;
  }

  const steps: RrefStep[] = [];
  const m = matrix.length; // rows
  const n = matrix[0].length; // cols
  
  // Clone matrix to avoid mutation
  let A = matrix.map(row => [...row]);
  
  steps.push({
    title: "Initial Matrix",
    matrix: A.map(row => [...row]),
    description: "Construct the matrix with vectors as columns."
  });

  let lead = 0;
  let rank = 0;

  for (let r = 0; r < m; r++) {
    if (n <= lead) break;
    
    let i = r;
    while (Math.abs(A[i][lead]) < 1e-10) {
      i++;
      if (m === i) {
        i = r;
        lead++;
        if (n === lead) {
          const res = { result: A, steps, rank };
          cacheService.set(cacheKey, res);
          return res;
        }
      }
    }

    // Swap rows i and r
    if (i !== r) {
      [A[i], A[r]] = [A[r], A[i]];
      steps.push({
        title: `Swap Row ${r + 1} and Row ${i + 1}`,
        matrix: A.map(row => [...row]),
        description: `Swapping rows to bring a non-zero element to the pivot position (row ${r + 1}, column ${lead + 1}).`
      });
    }

    // Divide row r by A[r][lead]
    const lv = A[r][lead];
    if (Math.abs(lv) > 1e-10) {
      A[r] = A[r].map(x => x / lv);
      steps.push({
        title: `Normalize Row ${r + 1}`,
        matrix: A.map(row => [...row]),
        description: `Dividing Row ${r + 1} by ${lv.toFixed(2)} to create a leading 1.`
      });
      rank++;
    }

    for (let i = 0; i < m; i++) {
      if (i !== r) {
        const lv2 = A[i][lead];
        A[i] = A[i].map((x, j) => x - lv2 * A[r][j]);
        if (Math.abs(lv2) > 1e-10) {
          steps.push({
            title: `Eliminate Column ${lead + 1} in Row ${i + 1}`,
            matrix: A.map(row => [...row]),
            description: `R${i + 1} = R${i + 1} - (${lv2.toFixed(2)}) * R${r + 1}`
          });
        }
      }
    }
    lead++;
  }

  // Clean up very small numbers
  A = A.map(row => row.map(x => Math.abs(x) < 1e-10 ? 0 : x));

  steps.push({
    title: "Reduced Row Echelon Form (RREF)",
    matrix: A.map(row => [...row]),
    description: "The matrix is now in its final reduced form. The number of leading ones (pivots) represents the rank."
  });

  const finalResult = { result: A, steps, rank };
  cacheService.set(cacheKey, finalResult);
  return finalResult;
}

export function findBasisVectors(originalMatrix: number[][], rrefResult: number[][], rank: number): number[][] {
  const basis: number[][] = [];
  if (rank === 0) return basis;

  const m = originalMatrix.length;
  const n = originalMatrix[0].length;

  for (let col = 0; col < n && basis.length < rank; col++) {
    for (let row = 0; row < m; row++) {
      if (Math.abs(rrefResult[row][col] - 1) < 1e-10) {
        // Check if this is a pivot (1 in RREF and zeros in other rows)
        let isPivot = true;
        for (let r = 0; r < m; r++) {
          if (r !== row && Math.abs(rrefResult[r][col]) > 1e-10) {
            isPivot = false;
            break;
          }
        }
        
        if (isPivot) {
          // Since we solved for vectors as columns, the columns are the original vectors
          // In our matrixToSolve, each row is an active vector values array (if we didn't transpose)
          // Wait, in my solveRREF, I pass math.transpose(activeVectors).
          // So rows are dimensions, columns are vectors.
          // Correct: Pivot columns in RREF correspond to independent vectors in the original set.
          // So we return the column from the ORIGINAL untransposed input? 
          // No, the columns in matrixToSolve are the vectors.
          // Let's re-verify: matrixToSolve = math.transpose(activeVectors). 
          // Column j is vector j.
          // If col j is a pivot, then vector j is a basis vector.
          basis.push(originalMatrix.map(row => row[col]));
          break;
        }
      }
    }
  }
  return basis;
}

export function findDependencyRelation(vectorsCount: number, rank: number): string {
  if (rank === vectorsCount) {
    return "Vectors are linearly independent (no dependency relation).";
  }
  const dependentCount = vectorsCount - rank;
  return `There ${dependentCount === 1 ? 'is' : 'are'} ${dependentCount} linearly dependent vector${dependentCount === 1 ? '' : 's'} that can be expressed as linear combinations of the other ${rank} basis vectors.`;
}
