'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Project { name: string; desc: string; img: string; link: string; }

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      whileInView={{ opacity: 1, scale: 1 }} 
      whileHover={{ scale: 1.05, rotateX: 5 }} 
      transition={{ type: 'spring' }}
      className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl hover:shadow-3xl hover:shadow-purple-500/25 overflow-hidden"
    >
      <Image src={project.img} alt={project.name} width={400} height={250} className="w-full h-48 object-cover rounded-xl group-hover:scale-110 transition-transform duration-500 mb-6" />
      <h3 className="text-2xl font-bold mb-4">{project.name}</h3>
      <p className="text-gray-300 mb-6">{project.desc}</p>
      <a href={project.link} className="text-purple-400 font-bold hover:underline">→ Voir Démo</a>
    </motion.div>
  );
}
