import * as React from 'react';

interface IProps {
  url: string;
}

export default function ConfirmMail({ url }: IProps) {
  return (
    <div>
      <h1>Добро пожаловать!</h1>
      <p>Осталось совсем немного, Вам нужно подтвердить свою эл. почту.</p>

      <a href={url}>Подтвердить Email</a>

      <p>или скопируйте ссылку и вставьте в ваш браузер</p>
      <a
        href={url}
        target="_blank"
        style={{
          color: '#A981DC',
        }}
      >
        {url}
      </a>
    </div>
  );
}
