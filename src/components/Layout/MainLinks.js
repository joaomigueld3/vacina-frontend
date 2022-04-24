/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  GitPullRequest,
  Database,
  Ticket,

} from 'tabler-icons-react';
import {
  ThemeIcon, UnstyledButton, Group, Text,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function MainLink({
  icon, color, label, path,
}) {
  const navigate = useNavigate();

  return (
    <UnstyledButton
      onClick={() => navigate(path)}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const routes = [
  {
    icon: <GitPullRequest size={16} />,
    color: 'blue',
    label: 'Home',
    path: '/',
  },
  {
    icon: <Database size={16} />,
    color: 'teal',
    label: 'List of Appointments',
    path: '/appointment',
  },
  {
    icon: <Ticket size={16} />,
    color: 'yellow',
    label: 'Schedule and Appointment',
    path: '/form',
  },

];

export default function MainLinks() {
  return (
    <div>
      {routes.map((route) => (
        <MainLink key={route.label} {...route} />
      ))}
    </div>
  );
}
