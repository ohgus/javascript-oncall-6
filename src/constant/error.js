export const ERROR_MESSAGE = Object.freeze({
  empty: '[ERROR]: 공백은 입력할 수 없습니다.',
  month_range: '[ERROR]: 1 ~ 12 사이의 숫자를 입력해 주세요.',
  NaN: '[ERROR]: 숫자가 아닌 값은 입력할 수 없습니다.',
  integer: '[ERROR]: 정수 값을 입력해 주세요.',
  invalid_day: '[ERROR]: 요일 입력이 올바르지 않습니다.',
  duplicate_person: '[ERROR]: 근무 순번에 중복된 이름이 있습니다.',
  order_range: '[ERROR]: 근무 인원은 최소 5명, 최대 35명 입니다.',
  name_length: '[ERROR]: 이름의 길이는 최소 2자, 최대 5자 입니다.',
  not_same:
    '[ERROR]: 평일, 휴일 근무 순번은 같은 인원, 같은 사람으로 구성되어야 합니다.',
});
