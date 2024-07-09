import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    console.log('Background fetch executed');
    return BackgroundFetch.Result.NewData;
  } catch (error) {
    console.error('Background fetch failed:', error);
    return BackgroundFetch.Result.Failed;
  }
});

export async function registerBackgroundFetchAsync() {
  try {
    // Unregister the task if it exists
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    if (isRegistered) {
      await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    }

    // Register the task
    await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60, // fetch interval in seconds
      stopOnTerminate: false,
      startOnBoot: true,
    });

    console.log('Background fetch task registered');
  } catch (error) {
    console.error('Failed to register background fetch task:', error);
  }
}

export async function unregisterBackgroundFetchAsync() {
  try {
    await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    console.log('Background fetch task unregistered');
  } catch (error) {
    console.error('Failed to unregister background fetch task:', error);
  }
}
