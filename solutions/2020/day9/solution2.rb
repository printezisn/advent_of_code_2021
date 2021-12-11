limit = 25
all_previous_nums = []
previous_nums = []
previous_nums_hash = {}

wrong_number = nil

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  current_num = line.to_i
  all_previous_nums << current_num
  previous_nums << current_num
  previous_nums_hash[current_num] = 1

  next if previous_nums.size <= limit

  if previous_nums[0...-1].none? { |previous_num| previous_nums_hash[current_num - previous_num] }
    wrong_number = current_num
    break
  end

  dropped_num = previous_nums.shift
  previous_nums_hash.delete(dropped_num)
end

(0...all_previous_nums.size - 1).each do |i|
  total = all_previous_nums[i]
  min = all_previous_nums[i]
  max = all_previous_nums[i]

  (i + 1...all_previous_nums.size - 1).each do |j|
    total += all_previous_nums[j]
    min = [min, all_previous_nums[j]].min
    max = [max, all_previous_nums[j]].max

    if total == wrong_number
      puts min + max
      return
    end
  end
end