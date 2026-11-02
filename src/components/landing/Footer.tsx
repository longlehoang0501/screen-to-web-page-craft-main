import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";

const SOCIALS = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "X (Twitter)", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
        <p className="font-display text-sm font-semibold tracking-wide">
          <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            AI NEXUS
          </span>
          <span className="text-muted-foreground"> 2026</span>
        </p>

        <div className="flex items-center gap-4">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-neon-blue/50 hover:text-neon-blue"
            >
              <social.icon className="h-4.5 w-4.5" />
            </a>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          © 2026 AI NEXUS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
