import { createConsumer } from "@rails/actioncable";

const buildWebsocketURL = () => {
  const currentUserId = localStorage.getItem("currentUser");

  return encodeURI(`/cable?email=${currentUserId}`);
};

export default () => createConsumer(buildWebsocketURL());
