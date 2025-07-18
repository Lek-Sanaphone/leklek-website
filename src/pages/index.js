// import clsx from 'clsx';
// import Link from '@docusaurus/Link';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeatures';

// import Heading from '@theme/Heading';
// import styles from './index.module.css';

// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <header className={clsx('hero hero--primary', styles.heroBanner)}>
//       <div className="container">
//         <Heading as="h1" className="hero__title">
//           {siteConfig.title}
//         </Heading>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/docs/intro">
//             LekLek's Docs
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default function Home() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <Layout
//       title={`Hello from ${siteConfig.title}`}
//       description="Description will go into a meta tag in <head />">
//       <HomepageHeader />
//       <main>
//         <HomepageFeatures />
//       </main>
//     </Layout>
//   );
// }

import Layout from '@theme/Layout';
import styles from './index.module.css';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout title="Lek Nammathao" description="I am a Software Engineering student at the University of Technology Sydney with a strong passion for cloud, networking, and technology.">
      <main className={styles.main}>
        <section className={styles.hero}>
          <img src="/img/avatar.png" alt="Lek avatar" className={styles.avatar} />
          <h1>Hello, I'm Lek Nammathao</h1>
          <p>I am a Software Engineering student at the University of Technology Sydney with a strong passion for cloud, networking, and technology. I have been working with self-hosted servers, managing Linux environments, and writing Bash scripts to keep systems running smoothly.</p>
          <p>These experiences have deepened my interest in building scalable cloud solutions and securing modern infrastructure.</p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/projects">
              View My Projects
            </Link>
            <Link className="button button--secondary button--lg" to="mailto:youremail@example.com">
              Contact Me
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
