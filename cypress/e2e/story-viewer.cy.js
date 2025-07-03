import users from "../fixtures/users.json";

describe("StoryViewer E2E", () => {
  const user = users[0];
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should render heading and correct story lists on home page", () => {
    // should have heading -SnapView
    cy.get('[data-testid="app-header"]').should("have.text", "SnapView");
    // should render stroy lists
    cy.get('[data-testid="story-list"]').should("exist");
    // should render correct stories on the page
    cy.get('[data-testid^="story-thumbnail-"]').should(
      "have.length",
      users.length
    );
    // should not render story viewer
    cy.get('[data-testid="story-viewer"]').should("not.exist");
  });

  it("should display the first story in the viewer and correct progress bars then run for 30 seconds and switches to next stroy and when all story finishes it closes the story viewer", () => {
    cy.clock();
    // when clicked on 1st stroy thumbnail to start story viewer of first user
    cy.get('[data-testid="story-thumbnail-1"]').click();
    // them story should be visible for 30 seconds and move to next
    user.stories.forEach((_, idx) => {
      if (idx > 0) {
        cy.tick(30000); // Simulate 30 seconds passing
      }

      cy.get('[data-testid="story-viewer"]').should("exist");
      cy.get('[data-testid="story-viewer-progress-bars"]').should("exist");
      cy.get(`[data-testid="progress-bar-${idx}"]`).should("exist");
      cy.get('[data-testid="story-viewer-story-image"]').should(
        "have.attr",
        "src",
        user.stories[idx].src
      );
      cy.get('[data-testid^="progress-bar-"]').should(
        "have.length",
        user.stories.length
      );
    });
    cy.tick(30000);
    // once all story viewed then story viewer should not be visible
    cy.get('[data-testid="story-viewer"]').should("not.exist");
    // then stroy list should be visible again
    cy.get('[data-testid="story-list"]').should("exist");
  });

  it("should move to next story when clicked on right side of screen and move to previous story when clicked on left side of screen", () => {
    // when clicked on 1st stroy
    cy.get('[data-testid="story-thumbnail-1"]').click();
    // then first story should be visible
    cy.get('[data-testid="story-viewer-story-image"]').should(
      "have.attr",
      "src",
      user.stories[0].src
    );

    // when clicked on right side to go to next story
    cy.get('[data-testid="story-viewer"]').click("right");
    // then next stroy should be visible
    cy.get('[data-testid="story-viewer-story-image"]').should(
      "have.attr",
      "src",
      user.stories[1].src
    );

    // when clicked right side again to go to third story (if exists)
    if (user.stories.length > 2) {
      cy.get('[data-testid="story-viewer"]').click("right");
      // then next story should be visible
      cy.get('[data-testid="story-viewer-story-image"]').should(
        "have.attr",
        "src",
        user.stories[2].src
      );
    }

    // when click on left side to go back to previous story
    cy.get('[data-testid="story-viewer"]').click("left");
    // then previous story should be visible
    cy.get('[data-testid="story-viewer-story-image"]').should(
      "have.attr",
      "src",
      user.stories[1].src
    );

    // when clicked on left side again to go back to first story
    cy.get('[data-testid="story-viewer"]').click("left");
    // then it should show prevoius stroy
    cy.get('[data-testid="story-viewer-story-image"]').should(
      "have.attr",
      "src",
      user.stories[0].src
    );
  });

  it("should close the stroy viewer when clicked on close button", () => {
    // when clicked on 1st stroy
    cy.get('[data-testid="story-thumbnail-1"]').click();
    // then story should be visible
    cy.get('[data-testid="story-viewer"]').should("exist");
    // when close button is clicked
    cy.get('[data-testid="story-viewer-close-button"]').click();
    // then stroy viewer should not be visible
    cy.get('[data-testid="story-viewer"]').should("not.exist");
  });
});
