// resume/index.js

import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Resume() {
  return (
    <Layout title="Resume" description="Lek Nammathao - Full Resume Overview">
      <main className={styles.container}>
        <header className={styles.header}>
          <h1>Lek Nammathao</h1>
          <p>Cloud & Full-Stack Developer | Soft Skills Advocate</p>
          <a
            href="/index.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadBtn}
          >
            📄 Download PDF
          </a>
        </header>

        <section className={styles.section}>
          <h2>🎓 Education</h2>
          <p><strong>University of Technology Sydney</strong> — B.Eng (Data Science Engineering), Expected 2027</p>
        </section>

        <section className={styles.section}>
          <h2>🛠️ Skills</h2>
          <ul>
            <li>Languages: Python, JavaScript, SQL</li>
            <li>Frameworks: React, FastAPI, Node.js</li>
            <li>Cloud: AWS, Docker, Proxmox, CI/CD</li>
            <li>Tools: Git, GitHub Actions, Zustand, Tailwind</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>💼 Projects</h2>
          <ul>
            <li><strong>Rainwater Prediction Dashboard</strong> - FastAPI + React + PostgreSQL tool for Saibai Island</li>
            <li><strong>LekLek Music App</strong> - React Native app with playback effects and Zustand</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>📜 Certifications</h2>
          <ul>
            <li>Google Data Analytics Professional Certificate</li>
            <li>AWS Cloud Practitioner Essentials</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>📬 Contact</h2>
          <p>Email: lek.nammathao@example.com</p>
          <p>GitHub: <a href="https://github.com/lek-sanaphone" target="_blank">@lek-sanaphone</a></p>
        </section>
      </main>
    </Layout>
  );
}