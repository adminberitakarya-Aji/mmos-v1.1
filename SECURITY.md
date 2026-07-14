# Security Policy

Thank you for helping keep MMOS secure.

The security of MMOS is a shared responsibility between maintainers, contributors, users, and the broader community.

If you discover a security vulnerability, please report it responsibly so that it can be investigated and resolved before public disclosure.

---

# Supported Versions

Security updates are provided for actively maintained versions of MMOS.

| Version | Supported |
| ------- | --------- |
| 1.1.x   | ✅ Yes     |
| < 1.1   | ❌ No      |

---

# Reporting a Vulnerability

Please **do not** report security vulnerabilities through public GitHub Issues.

Instead, contact the project maintainers through the designated private communication channel.

When reporting a vulnerability, please include:

* A clear description of the issue.
* Steps to reproduce the vulnerability.
* The affected version.
* The potential impact.
* Proof of concept (if available).
* Suggested mitigation (optional).

Providing detailed information helps us investigate and resolve issues more efficiently.

---

# Response Process

Once a vulnerability report is received, the maintainers will:

1. Acknowledge receipt of the report.
2. Verify and assess the issue.
3. Determine its severity.
4. Develop and test a fix.
5. Coordinate responsible disclosure.
6. Publish a security advisory if appropriate.

Our goal is to address confirmed vulnerabilities as quickly as possible while minimizing risk to users.

---

# Responsible Disclosure

We kindly ask security researchers to:

* Avoid public disclosure before a fix is available.
* Avoid accessing or modifying data that does not belong to you.
* Avoid disrupting production systems.
* Report findings in good faith.

Responsible disclosure helps protect the entire MMOS community.

---

# Security Best Practices

When deploying MMOS, we recommend:

* Use HTTPS for all public endpoints.
* Store secrets in a secure secret manager.
* Rotate API keys regularly.
* Apply the principle of least privilege.
* Keep dependencies up to date.
* Enable authentication and authorization where applicable.
* Monitor logs and security events.
* Regularly back up critical data.

---

# Scope

This policy applies to all official MMOS components, including:

* Runtime
* Orchestrator
* Providers
* SDK
* CLI
* Dashboard
* Gateway
* Official APIs

Third-party integrations may have their own security policies and are outside the scope of this document.

---

# Security Updates

Security fixes will be documented in:

* CHANGELOG.md
* GitHub Security Advisories (when available)
* Official release notes

Critical vulnerabilities may be released outside the normal release schedule.

---

# Acknowledgements

We sincerely appreciate responsible security researchers and community members who help improve the security of MMOS.

Your efforts contribute to making the platform safer for everyone.
