import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Resume() {
  return (
    <Layout title="Resume" description="Lek Nammathao - Software Engineering Resume">
      <main className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h1>Lek Nammathao</h1>
          <p className={styles.subHeader}>
            Software Engineering (Honours) Student — University of Technology Sydney
          </p>
          <p className={styles.contact}>
            <a href="mailto:lekuniversitylek@gmail.com">lekuniversitylek@gmail.com</a> |
            <a href="https://leklek.net" target="_blank" rel="noopener noreferrer"> leklek.net</a> |
            <a
              href="https://www.linkedin.com/in/lek-sanaphone-nammathao-4aa0a3312/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </p>
          <a
            href="https://resume.leklek.net/LekNammathao_Resume.pdf"
            className={styles.downloadBtn}
          >
            📄 Download PDF
          </a>
        </header>

        {/* Profile */}
        <section className={styles.section}>
          <h2>Profile</h2>
          <p>
            Motivated rising third-year <strong>Software Engineering</strong> student passionate about
            cloud computing, AI automation, and full-stack development. Skilled in Python, Java, Git,
            and Bash, with hands-on experience deploying self-hosted infrastructure and web automation.
            Eager to apply technical skills, learn from professionals, and contribute to innovative
            software projects.
          </p>
        </section>

        {/* Technical Skills */}
        <section className={styles.section}>
          <h2>Technical Skills</h2>
          <div className={styles.entry}>
            <ul className={styles.listInline}>
              <li><strong>Languages:</strong> Python, Java, Git, Bash</li>
              <li>
                <strong>Technologies & Tools:</strong> FastAPI, React, Docker, Proxmox, GitHub Actions,
                Cloudflare, Linux
              </li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section className={styles.section}>
          <h2>Education</h2>

          <div className={styles.entry}>
            <h3>University of Technology Sydney — Bachelor of Engineering (Honours)</h3>
            <p className={styles.date}>Sep 2024 – Dec 2027</p>
            <ul>
              <li>Achieved Diploma of Engineering with GPA: 6.8 / 7</li>
              <li>Awarded 20% Merit Scholarship</li>
            </ul>
          </div>

          <div className={styles.entry}>
            <h3>Kiettisack International School — Cambridge-based High School</h3>
            <p className={styles.date}>Sep 2022 – Jun 2023</p>
            <ul>
              <li>GPA: 3.35</li>
              <li>Cambridge A Level: Mathematics (A), Physics (B)</li>
            </ul>
          </div>
        </section>

        {/* Experience */}
        <section className={styles.section}>
          <h2>Experience</h2>

          <div className={styles.entry}>
            <h3>Doodee King — Sydney, NSW</h3>
            <p className={styles.date}>Chef’s Assistant • Sep 2024 – Present</p>
            <ul>
              <li>
                Adhered to strict food handling and hygiene standards, ensuring 100% compliance with
                NSW Food Safety regulations during daily kitchen operations.
              </li>
              <li>
                Prepared and served 50+ dishes per shift in a high-volume kitchen, coordinating with
                chefs to streamline workflow and cut prep time by up to 20% during peak hours.
              </li>
              <li>
                Supported chefs to improve service efficiency and reduce prep time during peak hours.
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <h3>Kumon — Nongkhai, Thailand</h3>
            <p className={styles.date}>Tutor Assistant • Jun 2020 – Aug 2020</p>
            <ul>
              <li>Tutored 20+ students weekly to build confidence in mathematics and reading.</li>
              <li>
                Designed personalized feedback strategies for 20+ students, increasing engagement and
                tracking progress that led to a 10% rise in average performance.
              </li>
              <li>
                Coordinated communication with 10+ parents to discuss student progress, ensuring
                alignment on learning goals and improvement plans.
              </li>
            </ul>
          </div>
        </section>

        {/* Projects */}
        <section className={styles.section}>
          <h2>Projects</h2>

          <div className={styles.entry}>
            <h3>
              Self-Host Server —{' '}
              <a href="https://cloud.leklek.net" target="_blank" rel="noopener noreferrer">
                cloud.leklek.net
              </a>
            </h3>
            <p className={styles.date}>Proxmox, Virtual Machines, Containers • Nov 2024 – Present</p>
            <ul>
              <li>
                Built and operated a self-hosted Proxmox stack running 5+ containerized services
                (media server, resume site, AI agent APIs), delivering <strong>99%+ uptime</strong> and
                secure remote access via Cloudflare Tunnels.
              </li>
              <li>
                Designed a <strong>remote power management system</strong> via mobile interface,
                reducing physical intervention by 90%.
              </li>
              <li>
                Engineered remote access with Tailscale and Cloudflare Tunnels; added static addressing,
                firewall rules, and MTU tuning to deliver <strong>99%+ uptime</strong> and reliable
                off-site access.
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <h3>
              Personal Website —{' '}
              <a href="https://leklek.net" target="_blank" rel="noopener noreferrer">
                leklek.net
              </a>
            </h3>
            <p className={styles.date}>React, Docusaurus, GitHub Pages, Cloudflare • Jul 2025 – Present</p>
            <ul>
              <li>
                Developed and deployed a <strong>personal knowledge hub and portfolio website</strong>{' '}
                using Docusaurus, hosted via GitHub Pages and Cloudflare, attracting
                <strong> 300+ unique visitors monthly</strong>.
              </li>
              <li>
                Integrated an <strong>AI-powered assistant</strong> that handles over{' '}
                <strong>100,000 requests per day</strong>, delivering intelligent navigation and cloud
                documentation retrieval for visitors and project collaborators.
              </li>
              <li>
                Automated continuous deployment pipelines with <strong>GitHub Actions</strong>, ensuring
                consistent site availability and zero downtime during content updates.
              </li>
            </ul>
          </div>
        </section>

        {/* Certifications */}
        <section className={styles.section}>
          <h2>Certifications</h2>
          <div className={styles.entry}>
            <h3>IELTS Academic — Overall Band 6.5</h3>
            <p className={styles.date}>Valid Aug 2023 – Aug 2025</p>
          </div>
          <div className={styles.entry}>
            <h3>Ultimate AWS Certified Cloud Practitioner — Udemy (Stephane Maarek)</h3>
            <p className={styles.date}>Aug 2025</p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
