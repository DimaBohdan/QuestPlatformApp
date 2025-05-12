import { QuestSortField } from "src/enums/QuestSortField.enum";
import { QuestSortOrder } from "src/enums/QuestSortOrder.enum";

export type QuestSort = {
  sortBy?: QuestSortField;
  sortOrder?: QuestSortOrder;
};