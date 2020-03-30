import React, { useState } from 'react';
import ButtonBase from '../components/ButtonBase/ButtonBase';
import { useConfirm } from './useConfirm';
import Modal from '../components/Modal/Modal';

export default {
  title: 'useConfirm',
};

export const Default = () => {
  return <DefaultUseConfirmStory />;
};

const DefaultUseConfirmStory = () => {
  const { confirm, isConfirming, onReject, onConfirm } = useConfirm();

  const [hasDeletedUser, setHasDeletedUser] = useState(false);

  /**
   * We can wrap important functions in 'confirm',
   * which will delay the function until the user
   * has confirmed.
   */
  const deleteUser = () => confirm(() => setHasDeletedUser(true));
  return (
    <div className="p-6">
      <ButtonBase onClick={deleteUser}>Delete User</ButtonBase>
      <Modal onClose={onReject} open={isConfirming}>
        <div className="p-6 grid grid-cols-1 gap-4 bg-white">
          <p>Are you sure you want to delete this user?</p>
          <div className="grid grid-cols-2 gap-4">
            <ButtonBase onClick={onReject}>Cancel</ButtonBase>
            <ButtonBase onClick={onConfirm}>Confirm</ButtonBase>
          </div>
        </div>
      </Modal>
      {hasDeletedUser && <div className="mt-6">You just deleted a user!</div>}
    </div>
  );
};
