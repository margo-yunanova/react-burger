import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css'

export default function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.cell}>
        <div className={`pl-5 pr-5 pb-4 pt-4 ${headerStyles.cell}`}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default">Конструктор</p>
        </div>
        <div className={`pl-5 pr-5 pb-4 pt-4 ${headerStyles.cell}`}>
          <ListIcon type="primary" />
          <p className="text text_type_main-default">Лента заказов</p>
        </div>
      </div>
      <div className="mt-6 mb-6">
        <Logo />
      </div>
      <div className={headerStyles.cell}>
        <ProfileIcon type="primary" />
        <p className="text text_type_main-default">Личный кабинет</p>
      </div>
    </header>
  );
}
