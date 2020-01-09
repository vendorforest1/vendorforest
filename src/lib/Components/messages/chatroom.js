import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { constants } from "@Shared/constants";
import Sidebar from "./sidebar/index";
import MessageBox from "./messageBox/index";
import { async } from "q";
const firebase = require("firebase/app");
// const storage = firebase.storage();

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allChats: [],
      selectedChat: 0,
      email: null,
    };
  }
  componentDidMount() {
    firebase
      .firestore()
      .collection("chats")
      .where("users", "array-contains", this.props.user.userObj.email)
      .onSnapshot(async (result) => {
        const chats = result.docs.map((_doc) => _doc.data());
        console.log("firechat ===== ", chats);
        await this.setState({
          allChats: chats,
          email: this.props.user.userObj.email,
        });
      });
  }

  buildDocKey = (friend) => [this.state.email, friend].sort().join(":");

  selectChat = async (chatIndex) => {
    await this.setState({
      selectedChat: chatIndex,
    });
    this.messageRead();
  };

  submitMessage = async (msg, fileInfo) => {
    const chatIndex = this.state.selectedChat;
    const docKey = this.buildDocKey(
      this.state.allChats[chatIndex].users.filter((_user) => _user !== this.state.email)[0],
    );
    if (fileInfo) {
      if (!msg) {
        msg = "attached file";
      }
      var filePath = "images/" + fileInfo.uid + "/" + fileInfo.name;
      await firebase
        .storage()
        .ref(filePath)
        .put(fileInfo)
        .then(async (fileSnapshot) => {
          await fileSnapshot.ref
            .getDownloadURL()
            .then(async (url) => {
              await firebase
                .firestore()
                .collection("chats")
                .doc(docKey)
                .update({
                  messages: firebase.firestore.FieldValue.arrayUnion({
                    sender: this.state.email,
                    message: msg,
                    timeStamp: new Date().toISOString(),
                    FileUrl: url,
                    storageUri: fileSnapshot.metadata.fullPath,
                    FileName: fileInfo.name,
                  }),
                  receiverHadRead: false,
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
    if (!fileInfo) {
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({
          messages: firebase.firestore.FieldValue.arrayUnion({
            sender: this.state.email,
            message: msg,
            timeStamp: new Date().toISOString(),
          }),
          receiverHadRead: false,
        });
    }
  };

  messageRead = () => {
    const chatIndex = this.state.selectedChat;
    console.log("index !!!!!=== ", chatIndex);
    const docKey = this.buildDocKey(
      this.state.allChats[chatIndex].users.filter((_user) => _user !== this.state.email)[0],
    );
    console.log("docKey !!!!!=== ", docKey);
    if (this.clickedChat(chatIndex)) {
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({ receiverHadRead: true });
    } else {
      console.log("Clicked message where user is sender");
    }
  };

  clickedChat = (chatIndex) =>
    this.state.allChats[chatIndex].messages[this.state.allChats[chatIndex].messages.length - 1]
      .sender !== this.state.email;

  render() {
    return (
      <div id="chat-room">
        <Sidebar
          chats={this.state.allChats}
          selectedChatIndex={this.selectChat}
          selectedChat={this.state.selectedChat}
        />
        <MessageBox
          chat={this.state.allChats[this.state.selectedChat]}
          handleSubmit={this.submitMessage}
          // handleFile={this.handleFile}
          messageRead={this.messageRead}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ messagesReducer, loginReducer }) => {
  const { error, success, pending } = messagesReducer;
  const { user } = loginReducer;
  return {
    error,
    success,
    pending,
    user,
  };
};

export default connect(mapStateToProps, {})(ChatRoom);
