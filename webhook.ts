/* eslint-disable @typescript-eslint/ban-ts-comment */
import {axios, express, localtunnel, LINE_TOKEN} from './require'
// TODO Watch app routing video refactoring on youtube.
const app = express();
const port = 3000;


app.post('/direct', (request, response) => {
    const postback = request.body.events[0].postback.data.split(' ');
    const action = postback[0];
    const episode = postback[1];
    console.log("hello");
});

app.listen(port, () => {
    console.log(`Express api/webhook app listening at http://localhost:${port}`);
});

const tunnel = localtunnel(port, { subdomain: 'episodecheck'}, (err, tunnel) => {
    console.log(`tunnel on ${tunnel.url}`);
});

const test = {"messages": [
    {
        "type": "flex",
        "altText": `revnjncakrej`,
        "contents": {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
      "size": "full",
      "aspectRatio": "20:13",
      "aspectMode": "cover",
      "action": {
        "type": "uri",
        "uri": "http://linecorp.com/"
      }
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "Brown Cafe",
          "weight": "bold",
          "size": "xl"
        },
        {
          "type": "box",
          "layout": "baseline",
          "margin": "md",
          "contents": [
            {
              "type": "icon",
              "size": "sm",
              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
            },
            {
              "type": "icon",
              "size": "sm",
              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
            },
            {
              "type": "icon",
              "size": "sm",
              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
            },
            {
              "type": "icon",
              "size": "sm",
              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
            },
            {
              "type": "icon",
              "size": "sm",
              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
            },
            {
              "type": "text",
              "text": "4.0",
              "size": "sm",
              "color": "#999999",
              "margin": "md",
              "flex": 0
            }
          ]
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "lg",
          "spacing": "sm",
          "contents": [
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "Place",
                  "color": "#aaaaaa",
                  "size": "sm",
                  "flex": 1
                },
                {
                  "type": "text",
                  "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "Time",
                  "color": "#aaaaaa",
                  "size": "sm",
                  "flex": 1
                },
                {
                  "type": "text",
                  "text": "10:00 - 23:00",
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            }
          ]
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "spacing": "sm",
      "contents": [
        {
          "type": "button",
          "style": "link",
          "height": "sm",
          "action": {
            "type": "postback",
            "label": "Test",
            "data": "tweeted&love"
          }
        },
        {
          "type": "button",
          "style": "link",
          "height": "sm",
          "action": {
            "type": "uri",
            "label": "WEBSITE",
            "uri": "https://linecorp.com"
          }
        },
        {
          "type": "spacer",
          "size": "sm"
        }
      ],
      "flex": 0
    }
  }}]
}
 const getLineConfig = () => ({
    method: 'post',
    url: 'https://api.line.me/v2/bot/message/broadcast',
    headers: { 
      'Authorization': 'Bearer ' + LINE_TOKEN, 
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(test)
})

 const makeRequest = (config) => {
        axios(config)
        // @ts-ignore
            .then(console.log("Notification sent!"))
            .catch((error) => {
                console.log(error.response)});
    }

    makeRequest(getLineConfig());