# Test

The UI design: https://www.figma.com/file/xh4iktpcpSaCPjJN9SMsDO/%E5%89%8D%E7%AB%AF%E6%B5%8B%E8%AF%95%E9%A2%98?nodeid=0%3A1

The live video: https://www.bilibili.com/video/BV1MU4y1V7aa/


Please provide the following:
1) Design document to explain the technology choice, and your assumptions. For example, did you use any external library to help, and why?
2) Source code in the GIT repository. You could use bitbucket, github or other similar
service.
3) Automated Test cases, if possible.
4) If it is a mobile app, please provide a way to download and install the app for review.
Alternatively, you could capture a movie of your mobile simulator if you cannot provide a downloadable app.
5) Note:
a. You could use the programming language that you are most familiar.
b. Keep it simple and make it looks good ☺


# Solution

Tech stacks: React + React Native + TypeScript + Jest

1) Use The React Native to develop, because it share code across platforms. use some external library below to develop:  
    1. **react-native-code-push**, which help us to quickly hot update App
    ```
    The CodePush plugin helps get product improvements in front of your end users instantly, by keeping your JavaScript and images synchronized with updates you release to the CodePush server. This way, your app gets the benefits of an offline mobile experience, as well as the "web-like" agility of side-loading updates as soon as they are available. It's a win-win!
    ```
    2. some navigation toolkits, such as **@react-navigation/native and @react-navigation/native-stack and react-native-screens**, React Navigation's native stack navigator provides a way for your app to transition between screens and manage navigation history. 
    3. **react-native-localize and i18n-js** provides i18n function, besides there would be greate if keep a github submodule and take a circle ci to intergate multiple languages to make a smooth translation partion
    4. **lodash-es**, A modern JavaScript utility library delivering modularity, performance & extras. use it's memoize function in the code.
    5. **react-native-linear-gradient** provides the linear-gradient component

2. you can goto [ReactNativeDemo](https://github.com/Albert-cord/ReactNativeDemo) to check out the codebase.

3. the simplest test case

4. you can download the screen/app-release.apk and install it to review the demo, or you can watch the [demo_en_video.mp4](./screen/demo_en_video.mp4) and [demo_zh_video.mp4](./screen/demo_zh_video.mp4) to review the demo.


# Troubleshooting
I change the setting:
```
org.gradle.java.home=I:/code/openjdk-11.0.2_windows-x64_bin/jdk-11.0.2
```
to modify the jdk pointer in the /android/gradle.properties file.
if you wanna establish the codebase by yourself, please change it base on your local machine env.