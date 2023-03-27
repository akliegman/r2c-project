import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  afterEach(() => {
    window.localStorage.removeItem('testKey');
  });

  it('should initialize with the provided initial value', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));

    expect(result.current[0]).toBe('initialValue');
  });

  it('should persist the stored value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));

    act(() => {
      result.current[1]('updatedValue');
    });

    const storedValue = window.localStorage.getItem('testKey');
    expect(storedValue).toBe(JSON.stringify('updatedValue'));
  });

  it('should retrieve the stored value from localStorage', () => {
    window.localStorage.setItem('testKey', JSON.stringify('storedValue'));

    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));

    expect(result.current[0]).toBe('storedValue');
  });
});