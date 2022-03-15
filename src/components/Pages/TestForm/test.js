import Parse  from "parse";

function TestForm(props) {
    Parse.initialize("myAppId")
    Parse.serverURL = "http://localhost/parse"
    const GameObject = Parse.Object.extend("GameScore")
    const gameScore = new GameObject()
    const Achievement = Parse.Object.extend({
        className: "Achievement"
      });
    gameScore.set("score",1337)
    gameScore.save().then((gameScore)=>console.log(gameScore)).catch(console.log)
 return <>123</>
}

export default TestForm;
