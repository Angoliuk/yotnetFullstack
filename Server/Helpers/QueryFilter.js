import { logger } from "../Logs/Logger.js";
import UserService from "../Services/UserService.js";

export const QueryFilter = async (model, query) => {
  const {
    _limit = 10,
    _page = 1,
    _expand = "",
    _sort = "_id",
    _order = "asc",
  } = query;
  logger.info("Entered to QueryFilter");
  const sortInFind = {};
  const sortInFindQueriesTypes = ["_like", "_gte", "_lte"];
  const orderNum = _order === "asc" ? 1 : -1;

  for (const key in query) {
    for (let i = 0; i < sortInFindQueriesTypes.length; i++) {
      if (key.includes(sortInFindQueriesTypes[i])) {
        const sortingType = key.split("_");
        switch (sortingType[1]) {
          case "like":
            sortingType[1] = "$regex";
            break;

          case "gte":
            sortingType[1] = "$gt";
            break;

          case "lte":
            sortingType[1] = "$lt";
            break;

          default:
            continue;
        }
        sortInFind[sortingType[0]] = {
          ...sortInFind[sortingType[0]],
          [sortingType[1]]: query[key],
        };
      }
    }
  }

  const data = await model
    .find(sortInFind)
    .skip(Number(_page) > 1 ? (Number(_page) - 1) * Number(_limit) : 0)
    .limit(Number(_limit))
    .sort({ [_sort]: orderNum });

  const addUserToData = async () => {
    const dataWithExpand = [];
    for (let i = 0; i < data.length; i++) {
      const user = await UserService.getOne(data[i]._doc.userId);
      dataWithExpand.push({ ...data[i]._doc, expanded: { user } });
    }
    return dataWithExpand;
  };

  switch (_expand) {
    case "user":
      return addUserToData();

    default:
      return data;
  }
};
