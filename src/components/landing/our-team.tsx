import { MemberCard } from "./member-card";

const team = [
  {
    name: "Ashraf Qopiah",
    role: "Founder",
    photo: "/team/ashraf.webp",
  },
  {
    name: "Mahmoud Saber",
    role: "Software Engineer",
    photo: "/team/mahmoud-saber.webp",
  },
  {
    name: "Ziad Zamel",
    role: "Frontend Developer",
    photo: "/team/ziad-zamel.webp",
  },
  {
    name: "Djourni Abdel Ali",
    role: "Frontend Developer",
    photo: "/team/ali.webp",
  },
  {
    name: "Amr Almasry",
    role: "Frontend Developer",
    photo: "/team/amr-almasry.webp",
  },
];

export function OurTeam() {
  return (
    <section className="landing-team" aria-labelledby="team-heading">
      <p className="section-kicker">THE PEOPLE</p>
      <h2 id="team-heading">Meet our team</h2>
      <p className="landing-team__subtitle">The team behind FSD CLI</p>
      <ul className="landing-team__grid grid max-[440px]:grid-cols-1 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {team.map((member) => (
          <MemberCard key={member.name} {...member} />
        ))}
      </ul>
    </section>
  );
}
