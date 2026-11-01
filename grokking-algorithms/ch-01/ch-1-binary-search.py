def binarySearch(array, value):
    low = 0
    high = len(array) - 1

    while low <= high:
        middle = (low + high) // 2
        if array[middle] > value:
            high = middle - 1
        elif array[middle] < value:
            low = middle + 1
        else:
            return middle

    return -1


array = list(range(1, 100))
value = int(input("Enter value to  check if in array: "))

index = binarySearch(array, value)

print(f"{value} found at index {index}" if index != -1 else f"{value} not found")
