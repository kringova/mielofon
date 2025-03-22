const rfcMocks = {
  "summary1": {
    title: "RFC: Implementing a New Authentication System",
    content: `
# RFC: Implementing a New Authentication System

## Introduction
This document proposes the implementation of a new authentication system to enhance security and user experience.

## Background
The current authentication system has several limitations, including outdated encryption methods and lack of support for multi-factor authentication.

## Proposal
- Implement OAuth 2.0 for secure authorization.
- Integrate multi-factor authentication using SMS and email.
- Update password encryption to use bcrypt.

## Impact
- Improved security for user accounts.
- Enhanced user experience with faster login times.
- Compliance with modern security standards.

## Timeline
- Phase 1: Research and planning (2 weeks)
- Phase 2: Development and testing (4 weeks)
- Phase 3: Deployment and monitoring (2 weeks)

## Participants
- Alice (Project Manager)
- Bob (Lead Developer)

## Related Items
- Task 1: Research OAuth 2.0
- Wiki Page 1: Security Standards
    `,
    participants: ["Alice", "Bob"],
    relatedItems: ["Task 1", "Wiki Page 1"]
  },
  "summary2": {
    title: "RFC: Redesigning the User Interface",
    content: `
# RFC: Redesigning the User Interface

## Introduction
This document outlines the plan to redesign the user interface to improve usability and accessibility.

## Background
The current UI has received feedback regarding its complexity and lack of accessibility features.

## Proposal
- Simplify navigation by consolidating menus.
- Implement responsive design for mobile compatibility.
- Add accessibility features such as keyboard navigation and screen reader support.

## Impact
- Increased user satisfaction and engagement.
- Broader accessibility for users with disabilities.
- Modernized look and feel of the application.

## Timeline
- Phase 1: Design mockups (3 weeks)
- Phase 2: Development and testing (5 weeks)
- Phase 3: User feedback and iteration (2 weeks)

## Participants
- Charlie (UI/UX Designer)
- Dave (Frontend Developer)

## Related Items
- Task 2: Create design mockups
- Wiki Page 2: UI Design Guidelines
    `,
    participants: ["Charlie", "Dave"],
    relatedItems: ["Task 2", "Wiki Page 2"]
  },
  "summary3": {
    title: "RFC: Enhancing the Data Analytics Platform",
    content: `
# RFC: Enhancing the Data Analytics Platform

## Introduction
This document proposes enhancements to the data analytics platform to support real-time data processing and advanced analytics.

## Background
The current platform lacks real-time processing capabilities and advanced analytics features.

## Proposal
- Integrate Apache Kafka for real-time data streaming.
- Implement machine learning models for predictive analytics.
- Upgrade the data storage solution to support larger datasets.

## Impact
- Real-time insights for decision-making.
- Improved accuracy of analytics with predictive models.
- Scalability to handle increased data volume.

## Timeline
- Phase 1: Infrastructure setup (4 weeks)
- Phase 2: Model development and testing (6 weeks)
- Phase 3: Deployment and optimization (3 weeks)

## Participants
- Eve (Data Scientist)
- Frank (DevOps Engineer)

## Related Items
- Task 3: Set up Apache Kafka
- Wiki Page 3: Data Analytics Architecture
    `,
    participants: ["Eve", "Frank"],
    relatedItems: ["Task 3", "Wiki Page 3"]
  }
};

export default rfcMocks; 