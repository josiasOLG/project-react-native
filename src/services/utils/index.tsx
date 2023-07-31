/* eslint-disable prettier/prettier */
const removeSpecialCharacters = (input) => {
  return input.replace(/[^a-zA-Z0-9]/g, '');
};

const formatarNumero = (numero) => {
  let valorSemPonto = numero.replace('.', '');
  valorSemPonto = valorSemPonto.replace(/,.*$/, '');
  return valorSemPonto;
}
export const base64toBlob = (base64, type) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], {type: type});
};

export const formatMoney = (money) => {
  if (typeof money !== 'string') {
    return money;
  }
  let valorSemPonto = money.replace('.', '');
  let valorSemVirgula = valorSemPonto.replace(/,00$/, '');
  return valorSemVirgula;
}

export const extrairHora = (dataISO) => {
  const data = new Date(dataISO);
  const horas = data.getUTCHours().toString().padStart(2, '0');
  const minutos = data.getUTCMinutes().toString().padStart(2, '0');

  return `${horas}:${minutos}`;
}


export const formatarDataNotificacao = (dataISO) => {
  const data = new Date(dataISO);
  const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const mes = meses[data.getUTCMonth()]; // Os meses começam a contar a partir do 0
  const ano = data.getUTCFullYear();

  return `${mes}, ${ano}`;
}

export const formatarCelular = (celular) => {
  return celular.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

export const formatarData = (data) => {
    const dataIso = new Date(data);
    const dia = dataIso.getDate().toString().padStart(2, '0');
    const mes = (dataIso.getMonth()+1).toString().padStart(2, '0'); // Os meses começam a contar a partir do 0
    const ano = dataIso.getFullYear();
    return `${dia}/${mes}/${ano}`;
};

export const formatarCPF = (cpf) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const isEmpty = (value) => {
  return !value || value.trim() === '';
};

export const convertDatePtBrToUs = (datePtBr) => {
  if (!datePtBr) {
    return null;
  }

  const [day, month, year] = datePtBr.split('/');
  const dateUs = `${year}-${month}-${day}`;

  return dateUs;
};

export const isValidEmail = (email) => {
  // Verifica se o email possui o formato correto
  if (!email || email.trim() === '') return false;
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return regex.test(email);
};



export const isFullName = (name) => {
  if (!name) {
    return false;
  }

  // Verifica se há pelo menos um espaço no nome
  const hasSpace = /\s/.test(name);

  return hasSpace;
};

export const isBirthdate = (dateString) => {
  if (!dateString) {
    return false;
  }

  // Verifica se a data fornecida é uma data válida
  if (isNaN(Date.parse(dateString))) {
    return false;
  }

  const birthdate = new Date(dateString);
  const now = new Date();

  // Verifica se a data fornecida está no passado
  if (birthdate.getTime() > now.getTime()) {
    return false;
  }

  // Verifica se a pessoa tem pelo menos 18 anos
  const eighteenYearsAgo = new Date(
    now.getFullYear() - 18,
    now.getMonth(),
    now.getDate()
  );

  if (birthdate.getTime() > eighteenYearsAgo.getTime()) {
    return false;
  }

  return true;
};


export const validaCPF = (cpf) => {
  if (!cpf) {
    return false;
  }

  cpf = cpf.replace(/[^\d]+/g, '');
  if (
    cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  ) {
    return false;
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
};




export const UtilsService = {
  removeSpecialCharacters,
  formatarNumero
};
