import { Injectable } from '@angular/core';
import { LocalStorageKey } from '@core/enums';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  /**
   * Sets a key in the local storage
   */
  public set(key: LocalStorageKey, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Gets a item out of the local storage
   */
  get<T>(key: LocalStorageKey): T | undefined {
    const value = localStorage.getItem(key);

    switch (value?.toLocaleLowerCase()) {
      case 'true':
        return true as unknown as T;
      case 'false':
        return false as unknown as T;
      default:
        return value ? (JSON.parse(value) as T) : undefined;
    }
  }

  /**
   * Removes a key from the local storage
   */
  remove(key: LocalStorageKey): void {
    localStorage.removeItem(key);
  }

  /**
   * Clears the whole local storage
   */
  clear(): void {
    localStorage.clear();
  }
}
