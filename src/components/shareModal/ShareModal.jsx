import { Modal, useMantineTheme } from "@mantine/core";
import PostShare from "../postShare/PostShare";

const ShareModal = ({ modalOpened, hideModal }) => {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="56%"
      opened={modalOpened}
      onClose={hideModal}
    >
      <PostShare />
    </Modal>
  );
};

export default ShareModal;
