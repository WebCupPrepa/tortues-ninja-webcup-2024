import { useCollectionsStore } from "@/stores/admin/collections.js";
import { useCurrentCollectionStore } from "@/stores/admin/currentCollection.js";

export async function guardDynamicCollection(to, from, next) {
  const currentCollectionStore = useCurrentCollectionStore();
  const collectionStore = useCollectionsStore();

  const name = to.params.name;
  if (name !== currentCollectionStore.currentCollection.collectionName) {
    currentCollectionStore.setCollectionName(name);
    currentCollectionStore.resetData();
    await currentCollectionStore.getDocs();
    await collectionStore.getDocs();
  }

  next();
}
