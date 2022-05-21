<div id="top" align="center">
    
![](https://i.imgur.com/VtPIP9k.png) 
</div>

<div align="center">
    <div>
    
   
[![Contributors][contributors-shield]][contributors-url]

[![Forks][forks-shield]][forks-url]

[![Stargazers][stars-shield]][stars-url]

[![Issues][issues-shield]][issues-url]
    </div>
</div>
    

<!-- PROJECT LOGO -->
<br />
<div>    
<div align="center">
  <a href="https://github.com/GSG-G11/Indonate">
    <img src="https://i.imgur.com/gJbA8hk.png" alt="Logo" width="40" height="40">
  </a>
</div>
  <h2 align="center">Indonate</h2>
  <p align="center">
    The best donation website you will see
    <br />
      <br />
    <div align='center'>
 <h3><a href="https://indonate.herokuapp.com/">Visit Indonate</a></h3>
   <h4><a href="https://www.figma.com/file/lhAfRWVmQ75y8USQoRp4wL/Indonate?node-id=0%3A1">Figma design</a></h4>
     <h4><a href="https://ibb.co/nwCQ0TJ">Schema design</a></h4>
      </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#About-The-Project">About The Project         </a>
      <ul>
        <li><a href="#Built-With">Built With</li> 
      </ul>
    </li>
    <li>
      <a href="#Set-up-application-locally">Install application</a>
    </li>
            <li>
      <a href="#User-Journey">User Journey</a>
    <ul>
<li><a href="#as-a-donor">donor</a></li>
<li><a href="#As-an-Admin">admin</a></li>        
      </ul>
    </li>
    <li>
      <a href="#User-Stories">User Stories</a>
         <ul>
<li><a href="#As-an-donor-I-can">donor</a></li>
<li><a href="#As-an-Admin-I-can">admin</a></li>        
      </ul>
    </li>
    <li><a href="#Contributers">Contributers</a></li>
  </ol>
</details>

<br>


<!-- ABOUT THE PROJECT -->
## About The Project

For over a decade, Indonate has responded to the hunger crisis, increase of unemployment rate and families without adequate shelter or heating by providing food, clothes and money to people in need through a nationwide network of campaigns. Today, Indonate is the nation’s largest domestic hunger-relief organization—a powerful and efficient network across the country. As the coronavirus pandemic brought record unemployment and instability, Indonate network rose to meet the need. Last year, Indonate network served 1000 families.

<p align="right"><a href="#top">back to top</a></p>



### Built With

* [Express.js](https://expressjs.com/)
* [React.js](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [Ant Design](https://ant.design/)
* [Sequelize](https://sequelize.org/)
* [Cloudinary](https://cloudinary.com/)
* [Jest](https://jestjs.io/)
    
<p align="right"><a href="#top">back to top</a></p>


## User Journey 🚀
### `As a Donor`:
    
* By entering indonate, **Donor** will be promoted with a **landing page** that shows a brief description of the amount of donations collected and spent on families in need, a **navbar** to navigate through the pages, our mission section, comments and feedbacks from users about the website, a **contact form** to submit an issue and a section for the **latest campaigns** that are running with the ability to view all campaigns and **search** for specific campaign or **filter** campaigns by desired category.
* When **donor** clicks on the **campaign card**, he will be redirected to a **page** with name, description, donations collected, beneficiary families for that campaign.
* **Donate** button will be available to press if donor is **logged in.**
* If donor is **not logged in** he will be redirected to the **login page** and will be asked to enter his email and passoword.
* **Donate** button will be disabled if the campaign is closed.
* If the **donor** clicks the **donate** button while he is logged in and the campaign is available to donate (open), A popup **form** will show on the screen, so can the donor donate.
* **Donor** can donate with the amount of money, food, clothes desired also inputs for adding needed information for the pickup of donated material, a description, location and deliever time for the donation that is submitted.
* If user doesn't have an account he can easily navigate to the **signup page** to create one.
  
### `As an Admin:`
* By entering indonate, **admin** will be promoted with an **overview page** where statistics about the top most generous donors donated to campaigns, top campaigns that the most donation and its to its target.
* **Campaigns page** where an **admin** can view all campaigns information or **adding**, **editing**, **deleting** a campaign or choosing beneficiary families by **closing the campaign**.
* An **admin** can also view **donors** information including donations collected by the donor and how to contact the donor, another tools where an admin can **add**, **edit** or **delete** a donor.
* Also an **admin** can either **add**, **edit** or **delete** a family and view information about families and donations recieved for this family and campaigns included for a specific family.
* lastly admin can view all **comments and feedback** submitted by users using the contact us form in the landing page.
<p align="right"><a href="#top">back to top</a></p>

    
## User Stories 📔
### `As a Donor I can:`
- **Access my account either by signing in or registering to the website.**
- **Navigate easily between sections and pages.**
- **View the latest campaigns and all dontaion stats.** 
- **Submit an issue using contact us form.**
- **View all website campaigns and filter or search by my own need.**
- **Access any campaign page and view full description of the campaign, the donations sumbitted for this campaign and beneficiary families included in this campaign.**
- **Submit a donation with the amount i desire either food or money or clothes.**

### `As an Admin I can:`
- **Access my account either by signing in or registering to the website.**
- **View overview page with all statistics including families, campaigns, all donations.**
- **View the all campaigns with its target donations and current donations.** 
- **Edit, delete close campaign and choose beneficiary families before closing a campaign.**
- **Edit, delete and view all donors information that are both donated and didn't donate and campaigns donated to.** 
- **Edit, delete and view all families in need, view assigned campaign for a specific family also view money, food and clothes donations recevied for that family.**
- **View all issues and feedback submitted by website applicants.**

<p align="right"><a href="#top">back to top</a></p>


## Set up application locally: 💻

1. Clone the repo

   ```
   git clone https://github.com/GSG-G11/Indonate.git
   ```
2. Install NPM packages
   * dir `/indonate`
   
        ```
       npm install
       ```
   * dir `/indonate/client`
   
        ```
       cd client 
       npm install
       ```
3. Enter your Database connection and Secret key in 
`.env` file
   ```sh
    DB_URL=postgres:<user_name>:<password>@localhost:5432/<db_name>
    SECRET=<secret key for access token>
   ```

<p align="right"><a href="#top">back to top</a></p>

<!-- CONTRIBUTING -->
## Contributers: 👥

### Team Leader
* [Raghad-Mezied](https://github.com/Raghad-Mezied)

### Team Members
* [Hani Olwan](https://github.com/HaniOlwan)
* [Mohammed Hamada](https://github.com/Mohammed-Hamada)
* [Deena Alghazali](https://github.com/DeenaAlghazali)
* [Farah Shaqoura](https://github.com/farah2003)

<!--Stretch Goals -->
## Stretch Goals: 🎯
* Chat
* Google OAuth
* Map

<p align="right"><a href="#top">back to top</a></p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/GSG-G11/Indonate.svg?style=for-the-badge
[contributors-url]: https://github.com/GSG-G11/Indonate/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/GSG-G11/Indonate.svg?style=for-the-badge
[forks-url]: https://github.com/GSG-G11/Indonate/network/members
[stars-shield]: https://img.shields.io/github/stars/GSG-G11/Indonate.svg?style=for-the-badge
[stars-url]: https://github.com/GSG-G11/Indonate/stargazers
[issues-shield]: https://img.shields.io/github/issues/GSG-G11/Indonate.svg?style=for-the-badge
[issues-url]: https://github.com/GSG-G11/Indonate/issues
[license-shield]: https://img.shields.io/github/license/GSG-G11/Indonate.svg?style=for-the-badge
[license-url]: https://github.com/GSG-G11/Indonate/blob/master/LICENSE.txt




