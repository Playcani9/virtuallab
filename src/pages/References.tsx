import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Book, Code, Library, FileText, MousePointer2, Quote } from 'lucide-react';

export default function References() {
  const sections = [
    {
      title: "Textbooks on Linear Algebra",
      icon: Book,
      items: [
        { 
          title: "Strang, G. (2016). Introduction to Linear Algebra (5th ed.). Wellesley-Cambridge Press.",
          desc: "A classic textbook with clear explanations and practical applications. Excellent for beginners."
        },
        { 
          title: "Lay, D. C., Lay, S. R., & McDonald, J. J. (2021). Linear Algebra and Its Applications (6th ed.). Pearson.",
          desc: "Comprehensive coverage with applications to computer science, engineering, and economics."
        },
        { 
          title: "Axler, S. (2015). Linear Algebra Done Right (3rd ed.). Springer.",
          desc: "Theoretical approach emphasizing understanding over computation. Recommended for mathematics majors."
        },
        { 
          title: "Poole, D. (2014). Linear Algebra: A Modern Introduction (4th ed.). Cengage Learning.",
          desc: "Modern approach with early emphasis on vectors and geometry. Includes technology projects."
        },
        { 
          title: "Anton, H., & Rorres, C. (2014). Elementary Linear Algebra (11th ed.). Wiley.",
          desc: "Classic textbook with comprehensive coverage and numerous exercises."
        }
      ]
    },
    {
      title: "Online Learning Resources",
      icon: Library,
      items: [
        { 
          title: "Khan Academy - Linear Algebra",
          link: "https://www.khanacademy.org/math/linear-algebra",
          desc: "Free comprehensive video tutorials and practice exercises covering all linear algebra topics."
        },
        { 
          title: "MIT OpenCourseWare - Linear Algebra",
          link: "https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/",
          desc: "Complete course materials from MIT, including video lectures by Gilbert Strang."
        },
        { 
          title: "3Blue1Brown - Essence of Linear Algebra",
          link: "https://www.3blue1brown.com/topics/linear-algebra",
          desc: "Visual and intuitive explanations of linear algebra concepts through animated videos."
        },
        { 
          title: "Paul's Online Math Notes - Linear Algebra",
          link: "https://tutorial.math.lamar.edu/Classes/LinAlg/LinAlg.aspx",
          desc: "Detailed notes and examples covering undergraduate linear algebra topics."
        },
        { 
          title: "Wolfram MathWorld - Linear Algebra",
          link: "https://mathworld.wolfram.com/topics/LinearAlgebra.html",
          desc: "Technical reference for linear algebra concepts, definitions, and formulas."
        }
      ]
    },
    {
      title: "Interactive Tools and Software",
      icon: MousePointer2,
      items: [
        { 
          title: "GeoGebra - Linear Algebra Tools",
          link: "https://www.geogebra.org/m/linear-algebra",
          desc: "Interactive geometry and algebra software with specific tools for linear algebra visualization."
        },
        { 
          title: "Desmos - 3D Graphing Calculator",
          link: "https://www.desmos.com/3d",
          desc: "Online 3D graphing calculator useful for visualizing vectors and planes in ℝ³."
        },
        { 
          title: "Wolfram Alpha - Linear Algebra Computations",
          link: "https://www.wolframalpha.com/examples/mathematics/linear-algebra",
          desc: "Computational engine for matrix operations, determinants, eigenvalues, etc."
        },
        { 
          title: "Matrix Calculator - Bluebit",
          link: "https://www.bluebit.gr/matrix-calculator/",
          desc: "Online matrix calculator for various linear algebra operations."
        }
      ]
    },
    {
      title: "Academic Papers and Articles",
      icon: FileText,
      items: [
        { 
          title: "Carlson, D. (1993). Teaching Linear Algebra: Must the Fog Always Roll In? College Mathematics Journal, 24(1), 29-40.",
          desc: "Discussion of pedagogical challenges in teaching linear algebra and strategies to address them."
        },
        { 
          title: "Dorier, J. L. (Ed.). (2000). On the Teaching of Linear Algebra. Springer.",
          desc: "Collection of papers on the didactics of linear algebra from an international perspective."
        },
        { 
          title: "Harel, G. (2000). Three Principles of Learning and Teaching Mathematics. Journal of Mathematical Behavior, 19(1), 79-91.",
          desc: "Principles applied to linear algebra education with emphasis on conceptual understanding."
        }
      ]
    },
    {
      title: "Programming Resources",
      icon: Code,
      items: [
        { 
          title: "NumPy Linear Algebra Documentation",
          link: "https://numpy.org/doc/stable/reference/routines.linalg.html",
          desc: "Python library for numerical linear algebra operations."
        },
        { 
          title: "Eigen C++ Library",
          link: "https://eigen.tuxfamily.org/",
          desc: "C++ template library for linear algebra: matrices, vectors, numerical solvers, and related algorithms."
        },
        { 
          title: "JavaScript Linear Algebra Libraries",
          multipleLinks: [
            { name: "Math.js", link: "https://mathjs.org/" },
            { name: "Sylvester", link: "http://sylvester.jcoglan.com/" },
            { name: "glMatrix", link: "https://glmatrix.net/" }
          ],
          desc: "Various JS libraries for vector and matrix math, ranging from extensive math suites to high-performance operations."
        }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-12 px-4 sm:px-6">
      <header className="space-y-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
        >
          References & Resources
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-500 font-medium"
        >
          Academic references, textbooks, and professional tools for mastering Linear Algebra.
        </motion.p>
      </header>

      <div className="grid gap-12">
        {sections.map((section, idx) => (
          <motion.section 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 pb-2 border-b-2 border-primary/20">
              <div className="p-2 bg-primary/10 rounded-xl text-primary">
                <section.icon size={28} />
              </div>
              <h2 className="text-3xl font-black text-slate-800">{section.title}</h2>
            </div>

            <div className="grid gap-6">
              {section.items.map((item, id) => (
                <div 
                  key={id}
                  className="glass-card-milky p-6 border border-slate-200/50 hover:shadow-xl transition-all group"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-400">
                      {id + 1}
                    </div>
                    <div className="flex-grow space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="text-lg font-black text-slate-800 leading-snug">
                          {item.title}
                        </h4>
                        {item.link && (
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:scale-110 transition-transform"
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                      
                      <p className="text-slate-500 font-bold text-sm leading-relaxed">
                        {item.desc}
                      </p>

                      {item.multipleLinks && (
                        <div className="flex flex-wrap gap-4 pt-2">
                          {item.multipleLinks.map((ml, mlIdx) => (
                            <a 
                              key={mlIdx}
                              href={ml.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-black text-primary px-3 py-1.5 bg-primary/5 rounded-lg hover:bg-primary hover:text-white transition-all flex items-center gap-1.5"
                            >
                              {ml.name} <ExternalLink size={12} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Citation Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 pb-2 border-b-2 border-accent/20">
            <div className="p-2 bg-accent/10 rounded-xl text-accent">
              <Quote size={28} />
            </div>
            <h2 className="text-3xl font-black text-slate-800">Citation Guidelines</h2>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 text-white/5 pointer-events-none">
              <Quote size={200} />
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h4 className="text-2xl font-black text-accent">How to Cite This Tool</h4>
                <p className="text-slate-400 font-bold">If you use this Linear Algebra Vector Checker in academic work, please use the following references:</p>
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl font-mono text-sm leading-relaxed">
                  Virtual Lab. (2025). Linear Algebra Vector Checker [Computer software]. Retrieved from aniketchougule1902.github.io/VirtualLab/
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h5 className="text-xs font-black uppercase tracking-widest text-slate-500">APA Format</h5>
                  <p className="text-sm font-bold leading-relaxed text-slate-200 italic">
                    Virtual Lab. (2025). Linear Algebra Vector Checker [Computer software]. aniketchougule1902.github.io/VirtualLab/
                  </p>
                </div>
                <div className="space-y-3">
                  <h5 className="text-xs font-black uppercase tracking-widest text-slate-500">MLA Format</h5>
                  <p className="text-sm font-bold leading-relaxed text-slate-200">
                    Virtual Lab. Linear Algebra Vector Checker. Virtual Lab, 2025, aniketchougule1902.github.io/VirtualLab/.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Further Reading */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/5 rounded-[2.5rem] p-8 sm:p-12 border border-primary/10"
        >
          <h2 className="text-2xl font-black text-primary mb-8">For Further Exploration</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "History", text: "Explore the development of linear algebra from determinants to vector spaces." },
              { title: "Applications", text: "Study applications in computer graphics, ML, quantum mechanics, and cryptography." },
              { title: "Advanced Topics", text: "Investigate eigenvalues, singular value decomposition, and tensor analysis." },
              { title: "Research", text: "Read about effective teaching strategies for abstract mathematical concepts." }
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <h5 className="font-black text-slate-800">{item.title}</h5>
                <p className="text-xs font-bold text-slate-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
