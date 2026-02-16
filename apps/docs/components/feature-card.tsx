import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
}

export function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  const card = (
    <article>
      <p>{icon}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );

  if (href) {
    return (
      <a href={href}>
        {card}
      </a>
    );
  }

  return card;
}

export function FeatureGrid({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
