export class Optional<T> {
  private readonly data: T | null | undefined;
  private readonly empty: boolean;

  private constructor(data: T | undefined | null) {
    if (data === null || data === undefined) {
      this.data = undefined;
      this.empty = true;
    } else {
      this.data = data;
      this.empty = false;
    }
  }

  public static empty<U>(): Optional<U> {
    return Optional.of(undefined as U);
  }

  public static of<U>(data: U | null | undefined): Optional<U> {
    return new Optional(data);
  }

  public map<U>(transform: (x: T) => U | undefined | null): Optional<U> {
    if (this.empty) {
      return Optional.empty<U>();
    }

    const transformed = transform(this.data!);
    return Optional.of(transformed);
  }

  public isPresent(): boolean {
    return !this.empty;
  }

  public ifPresent(supplier: (x: T) => void) {
    if (this.isPresent()) {
      supplier(this.data!);
    }
  }

  public orElseGet(other: () => T): T {
    if (!this.isPresent()) {
      return other();
    }
    return this.get();
  }

  public get(): T {
    return this.data!;
  }
}
