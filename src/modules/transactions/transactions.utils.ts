import { HttpException } from "@nestjs/common";
import { StatusCodes } from "http-status-codes";

// local
const throwBadRequest = message => {
  throw new HttpException({
    status: StatusCodes.BAD_REQUEST,
    error: message,
  }, StatusCodes.BAD_REQUEST);
}

// exported
const throwIfSourceAndTargetAccountsMatch = ({ sourceAccountId, targetAccountId }) => {
  if (sourceAccountId === targetAccountId) {
    throwBadRequest('Source and target accounts should not match');
  }
}
const throwIfSumIsNotPositive = sum => {
  if (sum < 0) {
    throwBadRequest('Sum should be positive');
  }
}
const throwIfBalanceHasInsufficientFunds = (balance, sum) => {
  if (balance < sum) {
    throwBadRequest('Source account has insufficient funds');
  }
}

export {
  throwIfSourceAndTargetAccountsMatch,
  throwIfSumIsNotPositive,
  throwIfBalanceHasInsufficientFunds,
}
