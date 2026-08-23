import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function SectionHeader({
  title,
  eyebrow,
  href,
  testId,
}) {
  return (
    <div className="flex items-center justify-between mb-4 w-full">
      {/* Título Principal de la sección */}
      <h2 className="text-lg font-bold tracking-tight text-paper">
        {title}
      </h2>
      
      {/* Link o Texto secundario (Eyebrow) */}
      {href ? (
        <Link 
          href={href} 
          data-testid={testId}
          className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-lime hover:text-white transition-colors cursor-pointer"
        >
          {eyebrow}
          <ChevronRight size={14} strokeWidth={2.5} />
        </Link>
      ) : (
        <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
          {eyebrow}
        </span>
      )}
    </div>
  );
}