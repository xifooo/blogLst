describe("BlogLst app", function () {
  // 5.17 - full clearing User and Blog's database, then register a user
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/tests/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "hellter",
      name: "jyeeho",
      password: "141414",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown by default", function () {
    localStorage.removeItem("loggedBlogAppUser");
    cy.get("input[name=Username]").type("hellter");
    cy.get("input[name=Password]").type("141414");
    cy.get("input[name=Password]").parents().find("button").click();

    cy.contains("hellter logged-in ::: ");
  });

  // 5.18 - login tests, successful and unsuccessful
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      const correctUserInfo = {
        username: "hellter",
        password: "141414",
      };
      cy.request("POST", "http://localhost:3003/api/login", correctUserInfo);
      cy.visit("http://localhost:3000");
    });
    // 5.18.Optional bonus exercise
    it("fails with wrong credentials", function () {
      cy.visit("http://localhost:3000");
      localStorage.removeItem("loggedBlogAppUser");
      cy.get("input[name=Username]").type("jyehoooo");
      cy.get("input[name=Password]").type("11111111");
      cy.get("input[name=Password]").parents().find("button").click();
      cy.get(".error").should("contain", "Wrong username or password");
    });
  });

  // 5.19 - check up whether one logged-in user could create a new blog
  describe("when logged in", function () {
    beforeEach(function () {
      const user = {
        username: "hellter",
        password: "141414",
      };
      cy.login(user);
    });

    it("A blog can be created", function () {
      cy.contains("create a blog").click(); // get the button

      cy.get("input[name=title]").type("Under pressure");
      cy.get("input[name=author]").type("David Bowie");
      cy.get("input[name=url]").type("youtube.com");
      cy.get("input[name=likes]").type(50);

      cy.get("[data-cy='blog-save-button']").click();
      cy.contains("Under pressure");
    });

    // 5.20, 5.21, 5.22
    describe("user can give blog a like, and has access to delete the blog", function () {
      beforeEach(function () {
        cy.login({
          username: "hellter",
          password: "141414",
        });
        cy.createSomeBlogs();
        cy.visit("http://localhost:3000");
      });
      // 5.20 - check up whether user could give blog a like
      it("give blog a like", function () {
        cy.get("ul>li").eq(0).contains("Like").click();
        cy.get("ul>li").eq(0).contains("View").click();
        cy.get("ul>li").eq(0).find("[data-testid='t5.15']").contains("101");
      });

      // 5.21 - check up that a blog could be deleted by its owner
      it("del a blog", function () {
        cy.get("ul>li").eq(0).contains("Delete").click();
        cy.get("ul>li").eq(0).contains("Under pressure");
      });

      // 5.22 - check up whether blogs are sorted in liking level, ask to the best likes blog first
      it("best likes blog owned will be located in first", function () {
        // get first blog
        cy.get("ul>li").eq(0).should("contain", "Smell like teen spirit");
        cy.get("ul>li").eq(1).should("contain", "Under pressure");
        cy.get("ul>li").eq(2).contains("Like").dblclick();
        cy.get("ul>li").eq(1).should("contain", "Get it by your hands");
      });
    });
  });
});
