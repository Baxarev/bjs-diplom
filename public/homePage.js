'use strict'

const logoutBtn = new LogoutButton();

logoutBtn.action = () => {
  ApiConnector.logout((response) => {
    if(response.success === true) {
      location.reload()
    }
  })
}

ApiConnector.current((response) => {
  ProfileWidget.showProfile(response.data)
})

const tableBody = new RatesBoard();

tableBody.callbackRates = () => {
  ApiConnector.getStocks((response) => {
  if (response.success === true) {
    tableBody.clearTable();
    tableBody.fillTable((response.data));
  }
})}

tableBody.callbackRates();

setInterval(tableBody.callbackRates, 6e4);

const moneyManager = new MoneyManager();

moneyManager.callbackText = (response) => {
  if (response.success === true) {
      ProfileWidget.showProfile(response.data)
      moneyManager.setMessage(response.success, moneyManager.callbackText.text)
    }
  if (response.success === false) {
      moneyManager.setMessage(response.success, 'Ошибка')
    }
}

moneyManager.addMoneyCallback = (data) => {
  moneyManager.callbackText.text = 'Пополнение прошло успешно';
  ApiConnector.addMoney(data, moneyManager.callbackText);
}

moneyManager.conversionMoneyCallback = (data) => {
  moneyManager.callbackText.text = 'Конвертация прошла успешно';
  ApiConnector.convertMoney(data, moneyManager.callbackText);
}

moneyManager.sendMoneyCallback = (data) => {
  moneyManager.callbackText.text = 'Перевод прошёл успешно';
  ApiConnector.transferMoney(data, moneyManager.callbackText);
}

const favoritesWidget = new FavoritesWidget();

favoritesWidget.getUpdatedTable = (response) => {
  if (response.success === true) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
}

favoritesWidget.getAddOrRemoveResult = (response) => {
  favoritesWidget.setMessage(response.success, response.error);
  if (response.success === true) {
    ApiConnector.getFavorites(favoritesWidget.getUpdatedTable);
  }
}

ApiConnector.getFavorites(favoritesWidget.getUpdatedTable);

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, favoritesWidget.getAddOrRemoveResult)
}

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, favoritesWidget.getAddOrRemoveResult)
}