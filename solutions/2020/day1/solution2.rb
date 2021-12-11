nums = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.map(&:to_i)
set = {}

nums.each { |num| set[num] = 1 }

(0...nums.size).each do |i|
  (i + 1...nums.size).each do |j|
    sum = nums[i] + nums[j]
    pair = 2020 - sum

    if set[pair]
      puts nums[i] * nums[j] * pair
      return
    end
  end
end