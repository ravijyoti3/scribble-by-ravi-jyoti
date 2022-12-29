export const subscribeToReportDownloadChannel = ({
  consumer,
  setMessage,
  setProgress,
  generatePdf,
}) => {
  const currentUser = localStorage.getItem("currentUser");
  const reportDownloadSubscription = consumer.subscriptions.create(
    {
      channel: "ReportDownloadChannel",
      pubsub_token: currentUser,
    },
    {
      connected() {
        setMessage("Connected the Cables...");
        generatePdf();
      },
      received(data) {
        const { message, progress } = data;
        setMessage(message);
        setProgress(progress);
      },
    }
  );

  return reportDownloadSubscription;
};
