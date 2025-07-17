import Layout from '@theme/Layout';
import styles from './index.module.css';
import projects from './projects.json'

export default function Projects() {
  return (
    <Layout title="Projects" description="A showcase of Lek Nammathao's personal and collaborative software projects.">
      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>Real-world applications I've built using modern technologies and best practices.</p>
        </header>
        <div className={styles.grid}>
          {projects.map((project, idx) => (
            <a
              key={idx}
              href={project.link}
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={project.image} alt={project.title} className={styles.image} />
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      </main>
    </Layout>
  );
}
