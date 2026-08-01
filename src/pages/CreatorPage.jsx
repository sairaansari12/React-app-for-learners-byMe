import React from 'react';

export default function CreatorPage() {
  return (
    <div className="creator-page">
      <section className="creator-hero creator-banner full-width-banner">
        <div className="banner-frame">
          <article className="banner-slide banner-slide-main">
            <div>
              <img
                src={`${process.env.PUBLIC_URL}/images/saira.jpg`}
                alt="Saira Ansari"
                onContextMenu={(e) => e.preventDefault()}
                className="slide-image"
              />
              <div className="linkedin-follow">
                <span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}>
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6 1.12 6 0 4.88 0 3.5 0 2.12 1.12 1 2.49 1 3.86 1 4.98 2.12 4.98 3.5ZM.22 23.5h4.53V7.98H.22V23.5zM8.82 23.5h4.34v-8.26c0-2.19 2.96-2.37 2.96 0v8.26h4.33v-9.87c0-5.48-5.95-5.27-6.76-2.58h.09v-1.17H8.82c.06.77 0 16.73 0 16.73z" />
                  </svg>
                  Follow on LinkedIn
                </span>
                <a href="https://linkedin.com/in/saira-ansari" target="_blank" rel="noopener noreferrer">
                  https://linkedin.com/in/saira-ansari
                </a>
              </div>
            </div>
            <div className="slide-copy">
              <span className="hero-badge">Creator</span>
              <h1>SAIRA BANO</h1>
              <p className="creator-title">
                Senior Full Stack Engineer | Solution Architect | Node.js • React.js • AWS • Microservices
              </p>
              <p className="creator-summary">
                Senior Full Stack Engineer with 11+ years of experience delivering scalable enterprise applications
                across fintech, e-commerce, marketplace, and service domains.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="creator-section">
        <h2>Professional Snapshot</h2>
        <ul>
          <li>Delivered 15+ enterprise applications across FinTech, E-commerce, Marketplace, and Enterprise domains.</li>
          <li>Architected OpenAPI migration and validation solutions that cut API specification errors by 70%.</li>
          <li>Mentored development teams, led design reviews, and owned HLD/LLD documentation for complex systems.</li>
          <li>Built secure, scalable cloud-native solutions using AWS, Azure, Docker, and CI/CD pipelines.</li>
        </ul>
      </section>

      <section className="creator-section creator-grid">
        <article>
          <h3>Key Achievements</h3>
          <ul>
            <li>Owned API governance standards and led OAS3 migration execution for PayPal.</li>
            <li>Published internal npm packages and custom Spectral validation tooling for 240+ APIs.</li>
            <li>Improved developer experience with compliance guides and API migration documentation.</li>
            <li>Delivered cloud-native solutions with measurable reliability, security, and performance gains.</li>
          </ul>
        </article>
      </section>

      <section className="creator-section">
        <h2>Core Competencies</h2>
        <div className="creator-competencies">
          <span>Full-Stack MERN Development</span>
          <span>System Design & Architecture</span>
          <span>Microservices & API Gateway Design</span>
          <span>Event-Driven Architecture (SQS)</span>
          <span>OpenAPI / Swagger & Spectral Validation</span>
          <span>CI/CD, Docker, Jenkins, Harness</span>
          <span>Auth & Security — OAuth2, JWT</span>
          <span>Monitoring, Logging & Observability</span>
        </div>
      </section>

      <section className="creator-section">
        <h2>Technical Skills</h2>
        <div className="creator-skill-grid">
          <article>
            <h4>Languages & Frameworks</h4>
            <p>JavaScript, TypeScript, Node.js, Express.js, React.js, Redux, Core Java, Spring Boot, Kotlin</p>
          </article>
          <article>
            <h4>Cloud & DevOps</h4>
            <p>AWS (Lambda, S3, EC2, Beanstalk, SQS, IAM, Cognito), Azure, Docker, Jenkins, Harness CI/CD</p>
          </article>
          <article>
            <h4>Databases</h4>
            <p>MySQL, PostgreSQL, MongoDB, Redis, Sequelize, Mongoose</p>
          </article>
          <article>
            <h4>APIs & Architecture</h4>
            <p>RESTful APIs, GraphQL, Microservices, API Gateway, OpenAPI, Spectral Validator</p>
          </article>
        </div>
      </section>
    </div>
  );
}
