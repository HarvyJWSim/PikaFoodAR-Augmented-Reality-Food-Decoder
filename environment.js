var environments = {
  staging: {
    FIREBASE_API_KEY: "blabla",
    FIREBASE_AUTH_DOMAIN: "blabla.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://blabla.firebaseio.com/",
    FIREBASE_PROJECT_ID: "blabla",
    FIREBASE_STORAGE_BUCKET: "blabla.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "blabla",
    GOOGLE_CLOUD_VISION_API_KEY: "AIzaSyCx5Ve_zW60jppH-9U1Lre3Wbs-iltqghM"
  },
  production: {
  }
};
function getReleaseChannel() {
  let releaseChannel = Expo.Constants.manifest.releaseChannel;
  if (releaseChannel === undefined) {
    return "staging";
  } else if (releaseChannel === "staging") {
    return "staging";
  } else {
    return "staging";
  }
}
function getEnvironment(env) {
  console.log("Release Channel: ", getReleaseChannel());
  return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment;
