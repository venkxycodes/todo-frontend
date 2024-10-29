import React from 'react';
import { Modal, Button } from 'antd';

const ConfirmationPopup = ({ visible, confirmDelete, cancelDelete }) => {
          return (
                    <Modal
                    title="Delete Task"
                    open={visible}
                    onCancel={cancelDelete}
                    footer={[
                              <Button key="back" onClick={cancelDelete}>No</Button>,
                              <Button key="submit" type="primary" onClick={confirmDelete}>Yes</Button>
                    ]}
                    >
                              <p>Are you sure you want to delete this task?</p>
                    </Modal>
          );
};

export default ConfirmationPopup;
