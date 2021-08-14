# Aufgabe "Binäre Suche"
# Name, Vorname: Carnein, Tom
# Matr.-Nr: 811269


def binarySearch(L, n, start, end):

    if len(L) < 1:
        return False
    
    if end < start:
        return False
    
    mid = (start + end) // 2

    if L[mid] == n:
        return True
    
    elif L[mid] < L[end] and L[mid] < n:
        return binarySearch(L, n, mid + 1, end)

    elif L[mid] < L[end] and L[mid] > n:
        return binarySearch(L, n, start, mid - 1)

    elif L[mid] > L[end] and L[mid] > n:
        return binarySearch(L, n, mid + 1, end)

    elif L[mid] > L[end] and L[mid] < n:
        return binarySearch(L, n, start, mid - 1)

    else:
        return False

def binSearch(L, n):
    return binarySearch(L, n, 0, len(L) - 1)


if __name__ == "__main__":

    # L = [25,29,31,43,57,65,74,76,80,90]
    # n = 90

    # L = [0,1,4,8,12,56,100,500]
    # n = 100

    # L = [0,1,4,8,12,56,100,500]
    # n = 2

    L = [1000,765,678,54,41,32,22,10,1]
    n = 765

    # L = []
    # n = 12

    print(binSearch(L, n))
