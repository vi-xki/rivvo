import React from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useGoals } from '@/store/useGoals';

export default function GoalModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const createGoal = useGoals((s) => s.createGoal);
  const [title, setTitle] = React.useState('');
  const [target, setTarget] = React.useState('500');

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const t = Math.max(1, Number(target || 0));
    if (!title.trim()) return;
    createGoal(title.trim(), t);
    setTitle('');
    setTarget('500');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Create savings goal">
      <form onSubmit={submit} className="space-y-4">
        <Input label="Goal name" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Emergency fund" />
        <Input label="Target amount" type="number" value={target} onChange={(e) => setTarget(e.target.value)} />
        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" type="submit">Create</Button>
        </div>
      </form>
    </Modal>
  );
}
