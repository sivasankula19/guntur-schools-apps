import React from 'react';
import { useParams } from 'react-router';

const ExamSchedule: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"ExamSchedule"}= {name}</div>
  );
};

export default ExamSchedule;
