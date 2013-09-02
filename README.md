##Minotaur Wars

Minotaur Wars is a realtime grid based tactics game built on NodeJS.

Additionally, here are instructions to deploy this app to Nodejitsu, Heroku, and Azure via Windows or Mac.

##How to Play

Game can be played on Chrome and iPad (in landscape mode). A screen resolution of at least 1400x700 on pc (for best experience). Make sure your zoom level is normal (100%).

Once you have entered a name for your team, you'll be given 3 units under your control delineated by green squares.

Select one of your units by clicking, you should see your movable area. Move next to another player by clicking in a blue square. To attack them, simply click on the opposing unit to execute an attack.

After moving there is a cool down before you can move again.

After attacking there is a cool down before you can attack again.

Attacking from the side of a unit will give you a bonus in attack power. Attacking from the back will give you an even higher bonus in attack power.

After a unit has died, he will eventually turn into a crystal that will restore all your health.

To pick up a crystal, just move to the square and your health will be restored. If you have full health when picking up a crystal, you'll gain more health, so stock up for the fight!

##Observed differences between Nodejitsu, Heroku, and Azure
- Nodejitsu's registration process can be done through the command line (pretty cool).
- Heroku requires a `Procfile` for NodeJS apps (Nodejitsu does not).
- Azure requires a `iis.yml` file for NodeJS apps (Nodejitsu does not).
- The port the app is running on is dynamically assigned for Heroku and Azure, Nodejitsu has you specify the port.
- Nodejitsu supports websockets, Heroku and Azure do not.
- Azure requires a credit card to sign up.
- Nodejitsu requires a credit card after 30 days (but doesn't require one to sign up).
- Heroku will let you run your NodeJS app (one dyno) for free.
- Azure doesn't support NodeJS v0.10.x (yet) here are changes between 0.8.x and 0.10.x: https://github.com/joyent/node/wiki/Api-changes-between-v0.8-and-v0.10
- Here is a blog post entry about 0.10.x (which is a stable release): http://blog.nodejs.org/2013/03/11/node-v0-10-0-stable/

##Instructions

Go to http://nodejs.org and install NodeJS

Then clone this repo:

    git clone https://github.com/amirrajan/minotaur-wars.git

And `cd` into the directory (all instructions below assume you are in the `minotaur-wars` directory:

    cd minotaur-wars

##Run Locally

Install all the dependencies:

    npm install (you may need to prefix this with sudo if you're on Mac)

Run the app:

    node server.js

Then navigate to `http://localhost:3000` open up two _different_ browsers (*not* IE) and play!

##Signing up, and deploying to Nodejitsu

The documenation was available on the front page (right under the sign up for free button): https://www.nodejitsu.com/getting-started/

Install the Nodejitsu Package

    npm install jitsu -g (you may need to prefix this with sudo if you're on Mac)

Register via the command line:

    jitsu signup (yes you can sign up via the command line)

You'll get a confirmation email with a command to type in:

    jitsu users confirm [username] [confirmation-guid]

If you've already registered, you can login with:

    jitsu login

After you confirm your email, you can login (the `confirm` command should prompt you to log in).

Change the `subdomain` value in `package.json`, to reflect the url you want to deploy to:

    {
      "name": "minotaur-wars",
      [...],
      "subdomain": "amirrajan-minotaur-wars" <--- this value
    }

now deploy:

    jitsu deploy

And your app should be up on Nodejitsu.

##Signing up, and deploying to Heroku

From heroku.com, click Documentation, then click the Getting Started button, then click Node.js from the list of options on the left...which will take you here: https://devcenter.heroku.com/articles/nodejs 

Install Heroku toolbelt from here: https://toolbelt.heroku.com/

Sign up via the website (no credit card required).

Login using the command line tool:

    heroku login

Create your heroku app:

    heroku create

Git deploy your app:

    git push heroku master

Assign a dyno to your app:

    heroku ps:scale web=1

Open the app (same as opening it in the browser):

    heroku open

And your app should be up on Heroku.

##Signing up, and deploying to Azure

From windowsazure.com, click Documentation, click Developer Center, click node.js, then click the Learn More button which will take you here:

http://www.windowsazure.com/en-us/develop/nodejs/tutorials/create-a-website-(mac)/ (if you're on a Mac, looks like the link is contextual)

Install the command line tools from here:

http://www.windowsazure.com/en-us/downloads/#cmd-line-tools (on Windows, be sure to install the cross platform command line interface...not the powershell version)

From the command line, first download your publish settings (this will redirect you to a website):

    azure account download

After the `.publishsettings` file is downloaded, you'll need to import it:

    azure acount import %pathtofile%

Next create the site, with a git backed repository:
    
    azure site create %uniquesitename% --git

Deploy site:

    git push azure master

List of your websites:

    azure site list

And your app should be up on Azure.

