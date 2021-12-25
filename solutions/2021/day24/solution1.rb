def valid_num?(arr, step, num)
  case step
  when 3
    arr[2] == num
  when 5
    arr[4] + 4 == num
  when 7
    arr[6] + 3 == num
  when 10
    arr[9] + 8 == num
  when 11
    arr[8] - 6 == num
  when 12
    arr[1] - 7 == num
  when 13
    arr[0] - 3 == num
  else
    true
  end
end

def run(arr = [], step = 0)
  return arr if step >= 14

  9.downto(1).each do |i|
    next unless valid_num?(arr, step, i)

    result = run(arr + [i], step + 1)
    return result if result
  end

  nil
end

puts run.join.to_i