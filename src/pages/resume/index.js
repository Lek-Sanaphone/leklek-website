import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Resume() {
  return (
    <Layout title="Resume" description="Lek Nammathao - Software Engineering Resume">
      <main className={styles.container}>
        <header className={styles.header}>
          <h1>Lek Nammathao</h1>
          <p className={styles.subHeader}>
            Software Engineering Student, University of Technology Sydney
          </p>
          <p className={styles.contact}>
            <a href="mailto:lekuniversitylek@gmail.com">lekuniversitylek@gmail.com</a> |
            <a href="https://leklek.net" target="_blank" rel="noopener noreferrer"> leklek.net</a> |
            <a href="https://www.linkedin.com/in/lek-sanaphone-nammathao-4aa0a3312/"> LinkedIn </a>
          </p>
          <a
            href="https://resume.leklek.net/LekNammathao_Resume.pdf"
            className={styles.downloadBtn}
          >
            📄 Download PDF
          </a>
        </header>

        <section className={styles.section}>
          <h2>Education</h2>
          <div className={styles.entry}>
            <h3>University of Technology Sydney</h3>
            <p className={styles.date}>Sep 2024 – Present</p>
            <p>Bachelor of Engineering (Honours) — GPA: 6.8 / 7</p>
            <ul>
              <li>Recipient of 20% Merit Scholarship</li>
            </ul>
          </div>
          <div className={styles.entry}>
            <h3>Kiattisak International School</h3>
            <p className={styles.date}>Sep 2022 – Jun 2023</p>
            <p>Graduated with GPA: 3.35</p>
            <ul>
              <li>Cambridge A Level: Mathematics (A), Physics (B)</li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Experience</h2>
          <div className={styles.entry}>
            <h3>Doodee King (Darling Quarter)</h3>
            <p className={styles.date}>Sep 2024 – Present</p>
            <p>Kitchen Hand, Entrée & Stir-fry Assistant Chef</p>
            <ul>
              <li>Ensured hygiene compliance and safe food handling</li>
              <li>Thrived in a high-volume, fast-paced kitchen environment</li>
            </ul>
          </div>
          <div className={styles.entry}>
            <h3>Kumon Education Centre</h3>
            <p className={styles.date}>Jun 2020 – Aug 2020</p>
            <p>Teacher Assistant</p>
            <ul>
              <li>Assisted students with mathematics and reading comprehension</li>
              <li>Maintained clear communication with students and parents</li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Technical Skills</h2>
          <ul className={styles.listInline}>
            <li>Python</li>
            <li>Java</li>
            <li>Git</li>
            <li>Bash</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Projects</h2>
          <div className={styles.entry}>
            <h3>
              Self-Hosted Server –{' '}
              <a href="https://cloud.leklek.net" target="_blank" rel="noopener noreferrer">
                cloud.leklek.net
              </a>
            </h3>
            <p className={styles.date}>Nov 2024 – Present</p>
            <ul>
              <li>Deployed a personal cloud with media server, resume hosting, and AI agents via Proxmox</li>
              <li>Engineered a mobile-controlled remote power system for off-site accessibility</li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Certifications</h2>
          <p className={styles.date}>(Valid) Aug 2023 – Aug 2025</p>
          <p>IELTS Academic: Overall Band 6.5</p>
        </section>
      </main>
    </Layout>
  );
}
