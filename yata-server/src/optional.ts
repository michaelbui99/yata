export class Optional<T> {
  private readonly data: T | undefined;
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

  public static empty(): Optional<null> {
    return new Optional(null);
  }

  public static of(data: any) {
    return new Optional(data);
  }

  public map<U>(
    transform: (x: T) => U | undefined | null,
  ): Optional<U> | Optional<null> {
    if (this.empty) {
      return Optional.empty();
    }

    const transformed = transform(this.data!);
    return Optional.of(transformed);
  }
}
