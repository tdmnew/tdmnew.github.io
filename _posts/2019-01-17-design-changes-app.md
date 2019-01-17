---
title: Late Design Changes Are Costly, But A Good Learning Experince
layout: post 
---

I finally had the opportunity to properly deploy my MERN app [Get It Together](https://getittogether.planestrainsandvideogames.com). The app was technically completed for weeks, but I made the late-stage decision that I would use static files for the front-end via react-scripts build and have another part of my droplet on [Digital Ocean](https:///www.digitalocean.com) handle the REST api to save on resources.

Did I mention how much I absolutely love Digital Ocean? Man, top notch service for just $5 a month. But that's really just a post for another day.

Anyway, I'm still new to DevOps and deployment, but reading a few helpful tutorials managed to get me up and running with Nginx, SSH and everything else to get my sites up and running. At that point I was still using the development server for the front-end. I'm still learning about the differences between server-side rendering and client-side rendering, but I realised soon after that my app didn't have enough dynamic content to warrant the hit on performance that server-side rendering would give.

The problem I had was that I opted to use [react-dom-router](https://reacttraining.com/react-router/core/guides/philosophy) which meant react-scripts build didn't explore the links to the other pages I'd created.

	const loggedInNav = 
			<Navbar fluid inverse collapseOnSelect>
				<Navbar.Brand>
				  <a href="/">Get It Together</a>
				</Navbar.Brand>
			  <Navbar.Toggle/>
			  <Navbar.Collapse>
            <div>
              <Nav pullLeft>
                <NavItem href="/addhabit">Add Habit</NavItem>
                <NavItem href="/edithabit">Edit Habit</NavItem>
                <NavItem href="/about">About</NavItem>
              </Nav>
                <Nav pullRight> 
                <NavItem href="/profile">Profile</NavItem>
                <NavItem href="/" onClick={ this.logOff }>Log Off</NavItem>
             </Nav>
            </div>
			  </Navbar.Collapse>
			</Navbar> 

	const loggedOffNav = 
			<Navbar fluid inverse collapseOnSelect>
				<Navbar.Brand>
				  <a href="/">Get It Together</a>
				</Navbar.Brand>
			  <Navbar.Toggle/>
			  <Navbar.Collapse>
		  <div>
			<Nav pullRight>
			<NavItem href="/register">Register</NavItem>
			<NavItem href="/about">About</NavItem>
			</Nav>
		  </div>
			  </Navbar.Collapse>
			</Navbar> 

Eventually I found out about [react-snap](https://www.npmjs.com/package/react-snap) which uses a headless version of Google Chrome to crawl through all the links of the pages on your site and generates separate pages. I had nothing but problems with this package, in that half the time it would generate unusual content for my web pages (e.g. change the padding for a component to be 30% instead of 0, or change a field for a form to be for a password instead of an email address).

I spent a good day and a half in frustration trying to figure out what the problem was. Unfortunately, the package is still quite new, and it appears that nobody else has documented these issues. I was concerned that the structure of my app was not conducive to a package like this in the end, and began to wonder if I made a poor design choice.

It eventually dawned on me that I could completely eliminate routing entirely, given that there weren't even that many pages to justify using routing at all. I remembered that I had used the brilliant [react-modal](https://www.npmjs.com/package/react-modal) package previously in my app, and realised I could just kill two birds with one stone and use that for generating pages instead. And it worked perfectly, with very little effort to implement:

	switch(this.props.page) {
			case "addhabit":
				return (
					<Modal isOpen={this.state.modalOpen} setAppElement="root">
					{closeButton}
					<AddHabit/>
					</Modal>
				)
			case "edithabit":
				return (
					<Modal isOpen={this.state.modalOpen} setAppElement="root">
					{closeButton}
					<EditHabit/>
					</Modal>
				)
			case "register":
				return (
					<Modal isOpen={this.state.modalOpen} setAppElement="root">
					{closeButton}
					<Register/>
					</Modal>
				)
			case "profile":
				return (
					<Modal isOpen={this.state.modalOpen} setAppElement="root">
					{closeButton}
					<EditProfile/>
					</Modal>
				)
			case "about":
				return (
					<Modal isOpen={this.state.modalOpen} setAppElement="root">
					{closeButton}
					<About/>
					</Modal>
				)

Just by implementing a simple solution like the above, I managed to nix two packages and drastically save on server resources. Admittedly, I can't speak to how this has effected SEO, however...
