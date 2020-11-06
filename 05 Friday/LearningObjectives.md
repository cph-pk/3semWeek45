# Learning Objective
### 1. Forklare om behovet for Client-side routing i en SPA samt vise eksempler på brug af react router og subroutes.

> React renders the appropriate information on the DOM using its component structure. Client-side routing in React helps to maintain
the seamless user experience that a typical single-page application promises. This is achieved through an external React library called React Router.

* Ex: see https://github.com/cph-pk/3semWeek45/blob/main/02%20Tuesday/react-routing/src/App.js

> in the file App.js. In line 40-59 We use routing, and to be able to keep track of our url and for subrouting see line 83-85.

### 2. Kunne forklare rationalet bag hvorfor passwords ikke må gemmes i plain-text (selv på en sikker database) og vise en konkret løsning på problemet.

> It is not recommended to save passwords in plain text since hackers can listen in on the data transfered and therefore sniff out password for users. Instead one could
use bcrypt to hash our code. Hackers can still make use of a rainbow table, when they are building up databases with the hash of each "normal" used password.
However Bcrypt is very slow so hackers can't really make use of it. 

To be able to use bcrypt in netbeans one has to import the following dependency:

```java
<dependency>
   <groupId>org.mindrot</groupId>
   <artifactId>jbcrypt</artifactId>
   <version>0.4</version>
</dependency>
```

* Ex: See https://github.com/cph-pk/3semWeek45/blob/main/03%20Wednesday/dat3-startcode/src/main/java/entities/User.java

> in the file User.java. On line 60 we have a constructor that hashes the password with salt. Salt is a generated word that is added to the password to make the password longer before encryption, and therefore harder to hack.
We verify the password on line 54 in the same file.

### 3. Kunne implementere og forklare en JAX-RS, JWT-baseret sikkerhedsløsning, baseret på et udleveret startprojekt.

> We use a JWT based security implementation in the following link:

* https://github.com/Amazingh0rse/week45/blob/main/wednesday/cors/src/apiFacade.js

> See the file apiFacade.js. In line 14 We save a JWT localStorage which is saved on the client side browser.

> To be able to get it, we have to call the function in line 17. When we are logged in, and user/password has been authorized, a token is set to the user.
See this in action in line 31. In line 49 we add x-access-token to our header to be able to get the token of the logged in user.

> To be able to see the stored token we can also look under "Dev tools -> application -> local storage" to see the key and value of the token.
In our backend, the token is set to expire in 30 min.

> See file LogIndEndpoint.java from the following link:

* https://github.com/cph-pk/3semWeek45/blob/main/03%20Wednesday/dat3-startcode/src/main/java/security/LoginEndpoint.java
> in line 33 we set the timer to 30 minutes

> Also see the file called JWTAuthenticationFilter.java from the following link:

* https://github.com/cph-pk/3semWeek45/blob/main/03%20Wednesday/dat3-startcode/src/main/java/security/JWTAuthenticationFilter.java

> In line 38 we have a filter method where we check if a user has a valid token. This was set in the request header from the frontend which we described above.
As a final note we cannot manually expire a token after it has been created. Thus, you cannot log out with JWT on the server-side as you do with sessions.
JWT is stateless, meaning that you should store everything you need in the payload and skip performing a DB query on every request.

### 4. Kunne implementere og forklare en React baseret frontend der benytter et secure JAX-RS API

> See the answers in question 3 since we answered frontend and backend there.
### 5. Kunne forklare og implementere parallellisering af en række "langsomme" opgaver udført i et JAX-RS endpoint 

> Parallel is faster than sequential since it can do many external calls at the same time, while if we use the sequential method, the external calls will be done one after another, in sequence.

> Meaning a task cannot start before the previous called task has finised.
In our backend project. We have used parallel requests in the following link: 
* https://github.com/cph-pk/3semWeek45/blob/main/04%20Thursday/webscraber-momondo-demo/src/main/java/webscraper/Tester.java

> See line 33 we have a sequential method and we have a parallel method in line 45.

> To see our endpoints, check the following link: 
* https://github.com/cph-pk/3semWeek45/blob/main/04%20Thursday/webscraber-momondo-demo/src/main/java/rest/WebScraperResource.java

> Go to the file WebScraperResource.java to see an example of sequential in line 30 and parallel in line 40.

### 6. Kunne forklare og implementere JAX-RS endpoints, hvis svar helt eller delvist må hentes fra eksterne servere

> Lets start with our frontend.

* ex: https://github.com/cph-pk/3semWeek45/blob/main/05%20Friday/frontend/src/AllJokes.js

> See the file AllJokes.js, in line 7 we make an "external" call to our local host 
* http://localhost:8080/jokeFetcher/api/jokes/

> Backend:

* ex: https://github.com/cph-pk/3semWeek45/blob/main/05%20Friday/jokeFetcher-webscraber-momondo/src/main/java/rest/JokeResource.java

> See the file JokeRessoure.java, in line 52 we use an endpoint that calls a sequential request from an external server
and in line 62, we call a parallel request that does the same, but quicker.

> These endpoints call the runSequental() in line 33 and runParrallel() in line 45 in the Tester.java class from the following link:

* https://github.com/cph-pk/3semWeek45/blob/main/05%20Friday/jokeFetcher-webscraber-momondo/src/main/java/webscraper/Tester.java

> runSequental() and runParrallel() both have the external urls we are requesting data from.
