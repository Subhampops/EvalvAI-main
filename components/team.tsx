'use client'

import Link from 'next/link'
import { Linkedin, Github } from 'lucide-react'

const team = [
    {
        name: 'Team Member 1',
        role: 'Full Stack Developer',
        image: '/team/member1.jpg',
        linkedin: 'https://linkedin.com/in/member1',
        github: 'https://github.com/member1'
    },
    {
        name: 'Team Member 2',
        role: 'AI/ML Engineer',
        image: '/team/member2.jpg',
        linkedin: 'https://linkedin.com/in/member2',
        github: 'https://github.com/member2'
    },
    {
        name: 'Team Member 3',
        role: 'Frontend Developer',
        image: '/team/member3.jpg',
        linkedin: 'https://linkedin.com/in/member3',
        github: 'https://github.com/member3'
    },
    {
        name: 'Team Member 4',
        role: 'Backend Developer',
        image: '/team/member4.jpg',
        linkedin: 'https://linkedin.com/in/member4',
        github: 'https://github.com/member4'
    }
]

export function Team() {
    return (
        <section id="team" className="py-20 px-4 bg-muted/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Built by passionate developers dedicated to helping students ace their interviews
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="mb-4">
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-6xl font-bold text-primary">
                                    {member.name.charAt(0)}
                                </div>
                                <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                                <p className="text-sm text-muted-foreground text-center mb-4">{member.role}</p>
                            </div>

                            <div className="flex justify-center gap-3">
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                                    aria-label={`${member.name}'s LinkedIn`}
                                >
                                    <Linkedin size={20} />
                                </a>
                                <a
                                    href={member.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                                    aria-label={`${member.name}'s GitHub`}
                                >
                                    <Github size={20} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mentor Section */}
                <div className="mt-16 pt-12 border-t border-border">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-2">Under the Guidance of</h3>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <div className="bg-card rounded-xl p-8 border border-border shadow-lg">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-5xl font-bold text-primary flex-shrink-0">
                                    Dr. AB
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h4 className="text-2xl font-bold mb-2">Dr. Abhishek Bandopadhyay</h4>
                                    <p className="text-muted-foreground mb-4">Project Mentor & Guide</p>
                                    <p className="text-lg italic text-primary font-semibold">
                                        "Thank you for your guidance, Sir."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <p className="text-muted-foreground">
                        Want to contribute? Check out our{' '}
                        <a href="https://github.com/evalvai" className="text-primary hover:underline font-semibold">
                            GitHub repository
                        </a>
                    </p>
                </div>
            </div>
        </section>
    )
}
